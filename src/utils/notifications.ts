import { AndroidStyle, Notification } from "@notifee/react-native";

export const channelId = "general";

export const newEpisodeNotification: Notification = {
    title: "New article",
    subtitle: "Grey's Anatomy",
    body: "S17 E09 - In My Life",
    data: { showId: String(9) },
    android: {
        channelId,
        smallIcon: "ic_stat_name", // optional, defaults to 'ic_launcher'.
        largeIcon:
            "https://b.thumbs.redditmedia.com/ss0L-8MRW23gOdqu_hEAqs7MgGLZgE3j4N-ur4eRK7A.png",
        style: {
            type: AndroidStyle.BIGPICTURE,
            //Remote or local - can also overwrite large icon
            picture: require("../../assets/new-episode-ga-image.png"),
        },
        actions: [
            {
                pressAction: { id: "default" },
                title: "Watch Now",
            },
            { pressAction: { id: "bookmark" }, title: "Save For Later" },
        ],
    },
    ios: {
        categoryId: "new-episode",
        attachments: [
            {
                // Local file path.
                // url: require("./assets/new-episode-ga-image.png"),
                url: require("../../assets/trailer-greys.mp4"),
            },
        ],
    },
};