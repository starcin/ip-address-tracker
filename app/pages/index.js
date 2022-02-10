import Head from "next/head"
import Image from "next/image"
import styles from "../styles/Home.module.css"

export default function Home() {
	return (
		<div className={styles.container}>
			<h1>The Client</h1>
		</div>
	)
}

export async function getServerSideProps() {
	console.log("server side log")

	const res = await fetch(
		`https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}&date=1995-07-24`
	)
	const data = await res.json()

	console.log(data)

	return { props: { title: "My Title", content: "..." } }
}
