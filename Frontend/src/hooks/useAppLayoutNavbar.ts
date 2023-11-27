import { useEffect } from "react";
import { APP_LAYOUT_CONTAINER_ID } from "src/constants";
import {
  hideNavbar,
  selectIsNavbarVisible,
  showNavbar,
} from "src/features/appSettings";
import { useAppDispatch, useAppSelector } from "src/store/hooks";

const useAppLayoutNavbar = () => {
  const isNavbarVisible = useAppSelector(selectIsNavbarVisible);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const appLayoutContainer = document.getElementById(APP_LAYOUT_CONTAINER_ID);

    if (!appLayoutContainer) return;

    let lastScrollTop = 0;
    let isVisible = isNavbarVisible;

    const handleOnScroll = () => {
      const scrollTop = appLayoutContainer.scrollTop;

      const isScrollingDown = scrollTop > lastScrollTop;

      // Update the last scroll position
      lastScrollTop = scrollTop;

      // If scrolling down AND navbar is visible, hide it
      if (isVisible && isScrollingDown && scrollTop > 150) {
        isVisible = false;
        dispatch(hideNavbar());
        console.log("Scrolling down");
      }
      // If scrolling up and navbar is hidden, show it
      if (!isVisible && !isScrollingDown) {
        isVisible = true;
        dispatch(showNavbar());
        console.log("Scrolling up");
      }
    };

    // Add event handler to the scroll event
    appLayoutContainer.addEventListener("scroll", handleOnScroll);

    // Detach the event handler when component unmounts
    return () => {
      appLayoutContainer.removeEventListener("scroll", handleOnScroll);
    };
  }, []);

  return {
    isNavbarVisible,
  };
};

export default useAppLayoutNavbar;
