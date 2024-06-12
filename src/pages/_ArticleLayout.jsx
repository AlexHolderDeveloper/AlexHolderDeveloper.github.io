import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useScrollPercentage from "react-scroll-percentage-hook";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/ArticleLayout.css";
import ArticleMeta from "../articleMeta.jsx";
import RelatedPosts from "../components/RelatedPosts.jsx";
import { ScrollPilot } from 'scroll-pilot';
import TocIcon from "/toc_GoogleFonts.svg";
import { useArticleToc } from "../contexts/ArticleTocContextSetup.js";



function ArticleLayout() {
	const { ref, percentage } = useScrollPercentage();
	let location = useLocation();
	let [articleRouteName, setArticleRouteName] = useState("");
	let dateFormatOptions = {
		month: "long",
		day: "numeric",
		year: "numeric"
	};

	let [scrollPilotConfig, setScrollPilotConfig] = useState({});
	let [articleToc] = useArticleToc();



	useEffect(() => {
		setArticleRouteName(location.pathname.substring(location.pathname.lastIndexOf("/") + 1));

		document.getElementById("positionHelper").scrollTo({top: 0, left: 0, behavior: "smooth"});
	}, [location]);

	useEffect(() => {
		if (articleRouteName){
			document.title = ArticleMeta[articleRouteName].title + " | Alex Stormwood";
			// console.log(ArticleMeta[articleRouteName]);
			// setEstimatedReadingTime(readingTime(document.getElementById("positionHelper").textContent));
			setScrollPilotConfig({
				index: articleToc,
				aesthetics: {
					location: "top-left",
					icon: <img src={TocIcon} />,
					indicatorBackgroundColor: "var(--theme-950)",
					indicatorProgressColor:"var(--theme-100)",
					hideOnScroll: true,
					margins: {
						desktop: 10,
						mobile: 0
					},
					popupWidths: {
						desktop: "50%",
						mobile: "100%"
					}
				}
			});
		}
	}, [articleRouteName, articleToc]);

	return (<>

		<div id="root-container">
			<div id="tocHelper">
				<ScrollPilot className="scrollPilotManualStyles" config={scrollPilotConfig} />
			</div>
			<Navbar />
			<div id="article-scrollprogress">

				
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