import React, { useContext, useState } from "react";
import classes from "./Stories.module.scss";
import Story from "react-insta-stories";
import RestaurantContext from "../../../store/restaurant-context";
import CloseIcon from "@mui/icons-material/Close";
import { grey } from "@mui/material/colors";

const Stories = () => {
  const { stories } = useContext(RestaurantContext);
  const [activeStory, setActiveStory] = useState(null);

  // function returns the next active story in the slideshow
  const getNextActiveStory = (currentIndex) => {
    // if current story is the last story, return null
    if (currentIndex + 1 === stories.length) return null;
    // if there are still stories to be displayed, the next one will be displayed
    else if (currentIndex + 1 < stories.length) {
      const nextActiveStory = stories.at(currentIndex + 1);
      return {
        url: nextActiveStory.b2StorageFile,
        header: {
          heading: `${nextActiveStory.title}`,
          subheading: `${nextActiveStory.description}`,
          profileImage: `${nextActiveStory.b2StorageFile}`,
        },
        index: currentIndex + 1,
      };
    }
  };

  // function returns the story before the current one
  const getLastActiveStory = (currentIndex) => {
    // if current story is the first story, return null
    if (currentIndex === 0) return null;
    // if there is a story behind, it will be returned
    else if (currentIndex > 0) {
      const nextActiveStory = stories.at(currentIndex - 1);
      return {
        url: nextActiveStory.b2StorageFile,
        header: {
          heading: `${nextActiveStory.title}`,
          subheading: `${nextActiveStory.description}`,
          profileImage: `${nextActiveStory.b2StorageFile}`,
        },
        index: currentIndex - 1,
      };
    }
  };

  const storyContainerStyles = {
    position: "fixed",
    top: "0",
    left: "0",
    zIndex: "1000",
    opacity: "1",
  };

  return (
    <ul className={classes.stories}>
      {stories ? (
        stories
          .filter((story) => story.active)
          .map((story, i) => (
            <li
              className={classes.story}
              key={story.id}
              style={{ backgroundImage: `url(${story.b2StorageFile})` }}
              onClick={() =>
                // click on story sets the clicked story as the active story and starts the slideshow
                setActiveStory({
                  url: story.b2StorageFile,
                  header: {
                    heading: `${story.title}`,
                    subheading: `${story.description}`,
                    profileImage: `${story.b2StorageFile}`,
                  },
                  index: i,
                  id: story.id,
                })
              }
            ></li>
          ))
      ) : (
        <li className={classes.story}></li>
      )}

      {activeStory && (
        <>
          <Story
            width={"100vw"}
            height={"100vh"}
            stories={[activeStory]}
            storyContainerStyles={storyContainerStyles}
            onAllStoriesEnd={() => {
              setActiveStory(getNextActiveStory(activeStory.index));
            }}
            onNext={() => setActiveStory(getNextActiveStory(activeStory.index))}
            onPrevious={() =>
              setActiveStory(getLastActiveStory(activeStory.index))
            }
          />
          <div
            className={classes.story__close}
            onClick={() => setActiveStory(null)}
          >
            <CloseIcon
              sx={{ color: grey[300], fontSize: "3.6rem" }}
            ></CloseIcon>
          </div>
        </>
      )}
    </ul>
  );
};

export default Stories;
