function getWindowSize() {
    var width = window.innerWidth ||
    document.documentElement.clientWidth ||
    document.getElementsByTagName('body')[0].clientWidth;

    return width;
}

export default getWindowSize;