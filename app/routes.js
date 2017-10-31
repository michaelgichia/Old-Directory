// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import { getAsyncInjectors } from "utils/asyncInjectors";

const errorLoading = err => {
  console.error("Dynamic page loading failed", err); // eslint-disable-line no-console
};

const loadModule = cb => componentModule => {
  cb(null, componentModule.default);
};

export default function createRoutes(store) {
  // Create reusable async injectors using getAsyncInjectors factory
  const { injectReducer, injectSagas } = getAsyncInjectors(store); // eslint-disable-line no-unused-vars

  return [
    {
      path: "/",
      name: "directoryLandingPage",
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import("containers/DirectoryLandingPage/reducer"),
          import("containers/DirectoryLandingPage")
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, component]) => {
          injectReducer("directoryLandingPage", reducer.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      }
    },
    {
      path: "/tickets/event/:eventId/info",
      name: "EventInfomation",
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import("containers/EventInfomation/reducer"),
          import("containers/EventInfomation")
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, component]) => {
          injectReducer("eventInfo", reducer.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      }
    },
    {
      path: "/tickets/event/:eventId",
      name: "eventBuyTicket",
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import("containers/EventBuyTicket/reducer"),
          import("containers/EventBuyTicket")
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, component]) => {
          injectReducer("eventBuyTicket", reducer.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      }
    }, {
      path: '/modal',
      name: 'modalPoster',
      getComponent(location, cb) {
        import('components/Tabs/PaymentTabs')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    }, {
      path: "*",
      name: "notfound",
      getComponent(nextState, cb) {
        import("containers/NotFoundPage")
          .then(loadModule(cb))
          .catch(errorLoading);
      }
    }
  ];
}
