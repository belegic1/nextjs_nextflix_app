import { useRouter } from "next/router"
import Modal from "react-modal"
import cls from "classnames"

import styles from "../../styles/Video.module.css"
import {  getRequestedVideo, getYoutubeVideoById } from "../../lib/videos"
import Navbar from "../../components/nav/navbar"


export async function getStaticProps(context) {
    const videoId = context.params.videoId;
    const videoArray = await getYoutubeVideoById(videoId);
    // const video =  getRequestedVideo(videoId)
    return {
        props: {
            theVideo: videoArray.length > 0 ? videoArray[0] : {},
            // theVideo: video? video : {}
        },
        revalidate: 10, // In seconds
    };
}

export async function getStaticPaths() {
    const listOfVideos = ["mYfJxlgR2jw", "4zH5iYM4wJo", "KCPEHsAViiQ"];
    const paths = listOfVideos.map((videoId) => ({
        params: { videoId },
    }));

    return { paths, fallback: "blocking" };
}

Modal.setAppElement("#__next")

const Video = ({theVideo}) => {

    const router = useRouter()


    const { videoId } = router.query
  

    const {  publishTime,  channelTitle, statistics: {viewCount} = {viewCount: 0} } = theVideo
    return (
        <div className={styles.container}>
            <Navbar />
            <Modal className={styles.modal}
                isOpen={true}
                contentLabel="vatch the Video"
                onRequestClose={() => { router.back()}}
                overlayClassName={styles.overlay}
            >
                <div>
                    <iframe
                        className={styles.videoPlayer}
                        id="player" type="text/html" width="100%" height="390"
                        src={`http://www.youtube.com/embed/${videoId}?enablejsapi=1&origin=http://example.com&controls=0&rel=0`}
                        frameBorder="0"></iframe>
                </div>
                <div className={styles.modalBody}>
                    <div className={styles.modalBodyContent}>
                        <div className={styles.col1}>
                            <p className={styles.publishedTime}>{publishTime}</p>
                            <p className={styles.title}>{theVideo.title}</p>
                            <p className={styles.description}>{theVideo.description}</p>
                        </div>
                        <div className={styles.col2}>
                            
                            <p className={cls(styles.subText, styles.subTextWrapper)}>
                                <span className={styles.textColor }>Cast: </span>
                                <span className={styles.channelTitle}>{channelTitle} </span>
                            </p>
                            <p className={cls(styles.subText, styles.subTextWrapper)}>
                                <span className={styles.textColor }>View Count: </span>
                                <span className={styles.channelTitle}>{viewCount} </span>
                            </p>
                        </div>
                    </div>

                </div>
            </Modal>
        </div>
    )
}

export default Video
