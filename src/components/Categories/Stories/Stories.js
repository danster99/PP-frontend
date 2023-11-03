import React, { useEffect, useState } from "react";
import classes from "./Stories.module.scss";
import useHttp from "../../../hooks/useHttp";
import { API_URL } from "../../../config/config";
import Story from "react-insta-stories";

const Stories = () => {
  const [stories, setStories] = useState();
  const [activeStory, setActiveStory] = useState(null);
  const { sendRequest } = useHttp();

  useEffect(() => {
    const reqConfig = {
      url: `${API_URL}/menu/1/stories/`,
    };
    sendRequest(reqConfig, (data) => {
      setStories(data);
    });
  }, [sendRequest]);

  const storyContainerStyles = {
    position: "fixed",
    top: "0",
    left: "0",
    zIndex: "1000",
  };

  return (
    <ul className={classes.stories}>
      {stories ? (
        stories
          .filter((story) => story.active)
          .map((story) => (
            <li
              className={classes.story}
              key={story.id}
              style={{ backgroundImage: `url(${story.b2StorageFile})` }}
              onClick={() =>
                setActiveStory({
                  url: story.b2StorageFile,
                  header: {
                    heading: `${story.title}`,
                    subheading: `${story.description}`,
                    profileImage: `${story.b2StorageFile}`,
                  },
                })
              }
            ></li>
          ))
      ) : (
        <li className={classes.story}></li>
      )}
      {activeStory && (
        <Story
          width={"100vw"}
          height={"100vh"}
          stories={[activeStory]}
          storyContainerStyles={storyContainerStyles}
          onStoryEnd={() => setActiveStory(null)}
          onNext={() => setActiveStory(null)}
          onPrevious={() => setActiveStory(null)}
        />
      )}
    </ul>
  );
};

export default Stories;
