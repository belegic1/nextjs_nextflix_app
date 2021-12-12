import Image from "next/image"
import { useState } from "react"
import {motion} from "framer-motion"
import styles from "./card.module.css"
import cls from "classnames"


const Card = (props) => {
    const { imgUrl , size = 'medium ', id } = props
    const [imgSrc,setImgSrc] = useState(imgUrl)
    
    const handleOnError = () => {
        setImgSrc("https://images.unsplash.com/photo-1512070679279-8988d32161be?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=738&q=80")
    }
    
    const classMap = {
        large: styles.lgItem,
        medium: styles.mdItem,
        small: styles.smItem
    }
    const scale = id === 0 ? {scaleY: 1.075} : {scale: 1.075}
    return (
        <div  className={styles.container}>
            <motion.div whileHover={{
                ...scale,
                transition: { duration: .5 },
            }} className={cls(styles.imgMotionWrapper,classMap[size])}>
                <Image className={styles.cardImg} src={imgSrc}
                    onError={handleOnError} alt="poster" layout="fill" />

            </motion.div>
        </div>
    )
}

export default Card
