/**
*
* TabsMobile
*
*/

import React from "react";
import { Tabs as MobileTabs } from "antd";
const TabPane = MobileTabs.TabPane;

class TabsMobile extends React.Component {

  render() {
    return (
      <div>
        <MobileTabs defaultActiveKey="1" tabPosition="top" style={{ height: 220 }}>
          <TabPane tab="Tab 1" key="1">
            Content of tab 1
          </TabPane>
          <TabPane tab="Tab 2" key="2">
            Content of tab 2
          </TabPane>
          <TabPane tab="Tab 3" key="3">
            Content of tab 3
          </TabPane>
          <TabPane tab="Tab 4" key="4">
            Content of tab 4
          </TabPane>
          <TabPane tab="Tab 5" key="5">
            Content of tab 5
          </TabPane>
          <TabPane tab="Tab 6" key="6">
            Content of tab 6
          </TabPane>
          <TabPane tab="Tab 7" key="7">
            Content of tab 7
          </TabPane>
          <TabPane tab="Tab 8" key="8">
            Content of tab 8
          </TabPane>
          <TabPane tab="Tab 9" key="9">
            Content of tab 9
          </TabPane>
          <TabPane tab="Tab 10" key="10">
            Content of tab 10
          </TabPane>
          <TabPane tab="Tab 11" key="11">
            Content of tab 11
          </TabPane>
        </MobileTabs>
      </div>
    );
  }
}

TabsMobile.propTypes = {};

export default TabsMobile;