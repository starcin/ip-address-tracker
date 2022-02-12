import { useEffect, useState } from "react"

export default function Home(props) {
	const [ipAdd, setIpAdd] = useState("")
	const [ipData, setIpData] = useState()

	async function fetchData() {
		// Böyle adres sonuna '?' koyarak mı yapılıyor bu işler?
		const response = await fetch(`/api/ip_data?ipAdd=${ipAdd}`, {
			method: "GET",
			headers: { "Content-Type": "application/json" },
		})
		setIpData(await response.json())
	}

	const onIpSubmit = async (e) => {
		e.preventDefault()
		// console.log("submitted:", ipAdd)
		fetchData()
	}

	useEffect(() => {
		fetchData()
	}, [])

	return (
		<div>
			<main>
				<h1>IP Address Tracker</h1>
				<form className="form" onSubmit={onIpSubmit}>
					<input
						type="text"
						placeholder={ipData ? ipData.ip : "Leave empty for current IP"}
						onChange={(e) => setIpAdd(e.target.value)}
					/>
					<input type="submit" value="&#9002;"></input>
				</form>

				{ipData ? (
					<iframe
						// style={{ width: 100 + "%", height: 50 + "vh", border: 0 }}
						loading="lazy"
						src={`https://www.google.com/maps/embed/v1/view?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&center=${ipData.latitude},${ipData.longitude}&zoom=12`}
						// src={`https://www.google.com/maps/embed/v1/view?key=${process.env.GOOGLE_MAPS_API_KEY}&center=39,37&zoom=12`}
					></iframe>
				) : (
					<h2>... LOADING ...</h2>
				)}
				{ipData && (
					<div className="info-box">
						<div className="info-item">
							<h2>IP ADDRESS </h2>
							<p>{ipData.ip}</p>
						</div>
						<div className="info-item">
							<h2>LOCATION</h2>
							<p>
								{ipData.city}, {ipData.country_code}
							</p>
						</div>
						<div className="info-item">
							<h2>TIMEZONE</h2>
							<p>{ipData.timezone_gmt}</p>
						</div>
						<div className="info-item">
							<h2>ISP</h2>
							<p>{ipData.isp}</p>
						</div>
					</div>
				)}
			</main>
		</div>
	)
}
