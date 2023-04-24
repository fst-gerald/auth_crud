export module Helper {
    export const hideTabBar = () => {
        const tabBar = document.getElementById("ion-tab-bar");

        if (tabBar !== null) {
            tabBar.style.display = 'none';
        }
    }

    export const showTabBar = () => {
        const tabBar = document.getElementById("ion-tab-bar");

        if (tabBar !== null) {
            tabBar.style.display = 'flex';
          }
    }
}