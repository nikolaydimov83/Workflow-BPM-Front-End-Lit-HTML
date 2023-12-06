import styles from './Home.module.css'
export default function Home(){
    return (
        <section style={styles} id="home">
            <h1>Welcome to Plan B workflow system!</h1>
            <img src="./images/logoLargePost1.png" alt="home" />
            <h2>A place where you can do your job fast and safe.</h2>
            <h3>Manage your requests always on time</h3>
        </section>
    )
}