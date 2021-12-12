import styles from "./banner.module.css"
import  Image from "next/image"
import { useRouter } from "next/router"


const Banner = (props) => {

    const router = useRouter()


    const { imgUrl, title, subtitle, videoId } = props

    const handleOnPlay = () => {
        router.push(`/video/${videoId}`)
    }


    

    return (
        <div className={styles.container}>
            <div className={styles.leftWrapper}>
                <div className={styles.left}>
                    <div className={styles.nseriesWrapper}>
                        <p className={styles.firstLetter}>N</p>
                        <p className={styles.series}>S E R I E S</p>
                    </div>
                    <h3 className={styles.title}>{title}</h3>
                    <h3 className={styles.subTitle}>{subtitle}</h3>
                    <div className={styles.playBtnWrapper}>
                        <button className={styles.btnWithIcon} onClick={handleOnPlay}>
                            <Image src="/static/images/play_arrow.svg" alt="play iscon" width={32}  height={32} />
                            <span className={styles.playText}>Play</span></button>
                    </div>
               </div>
           </div>
            <div className={styles.bannerImg} style={{backgroundImage:`linear-gradient(to top right, rgba(228,221,221,.2)10%,rgba(0,0,0,.3) 95%) ,url(${imgUrl})`, width: "100%", height: "100%", position: "absolute", backgroundSize: "cover", backgroundPosition: "50% 50%"}}>

            </div>
        </div>
    )
}

export default Banner
