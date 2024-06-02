import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useScrollPercentage from "react-scroll-percentage-hook";
import { readingTime } from "reading-time-estimator";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/ArticleLayout.css";
import ArticleMeta from "../articleMeta.jsx";
import RelatedPosts from "../components/RelatedPosts.jsx";

function ArticleLayout() {
	const { ref, percentage } = useScrollPercentage();
	let location = useLocation();
	let [articleRouteName, setArticleRouteName] = useState("");
	let [estimatedReadingTime, setEstimatedReadingTime] = useState({});
	let dateFormatOptions = {
		month: "long",
		day: "numeric",
		year: "numeric"
	}


	useEffect(() => {

		setArticleRouteName(location.pathname.substring(location.pathname.lastIndexOf("/") + 1));
		
		
	}, [location])

	useEffect(() => {
		if (articleRouteName){
			document.title = ArticleMeta[articleRouteName].title + " | Alex Stormwood";
			// console.log(ArticleMeta[articleRouteName]);
			setEstimatedReadingTime(readingTime(document.getElementById("positionHelper").textContent));

		}
	}, [articleRouteName]);

	return (<>

		<div id="root-container">
			<Navbar />
			<div id="article-scrollprogress">
				<div id="article-info">
					<h1>{ArticleMeta[articleRouteName]?.title}</h1>
					<p>{estimatedReadingTime?.text}</p>
				</div>
				
				<div id="customScrollProgressBackground" style={{backgroundColor: "var(--theme-500)",height: "5px", width: "100%"}}>
					<div id="customScrollProgressForeground" style={{backgroundColor: "var(--theme-100)",height: "100%", width: `${percentage.vertical}%`}}>

					</div>
				</div>
			</div>
			<div id="positionHelper" ref={ref}>

				<main>
					<div id="articleTimeInfo">
						<p>Published: {new Date(ArticleMeta[articleRouteName]?.createdAt).toLocaleDateString("en-AU", dateFormatOptions)}</p>
						<p>Last updated: {new Date(ArticleMeta[articleRouteName]?.lastUpdated).toLocaleDateString("en-AU", dateFormatOptions)}</p>
					</div>
					{articleRouteName ? ArticleMeta[articleRouteName].component : null}
				</main>
				{ArticleMeta[articleRouteName] ? <RelatedPosts tagsList={ArticleMeta[articleRouteName]?.tags} /> : null}
				<Footer />
			</div>
		</div>
	</>)
}



export default ArticleLayout;