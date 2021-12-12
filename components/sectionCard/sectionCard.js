import Card from "../card/card"
import styles from "./sectionCard.module.css"
import Link from "next/link"

const SectionCard = (props) => {

    const { title, videos = [], size } = props
    for (const video of videos) {
    }
    return (
        <section className={styles.container}>
            <h2 className={styles.title}>{title}</h2>
            <div className={styles.cardWrapper}>
                {videos.map((video,i) => {
                    return (

                        <>
                            <Link href={`/video/${video.id.videoId}`}>
                                <a >
                                    <Card id={i} imgUrl={video.imgUrl} size={size} />
                                </a>
                            </Link>
                        </>

                    )
                }
                )}
            </div>
        </section>
    )
}

export default SectionCard
