import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';


const News = (props) => {

    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)
    // document.title = `${capitalizeFirstLetter(props.category)} - Hassan-News`;

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const updateNews = async () => {
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=ca37f961caad4a8f8e3e9e092d6f6ac1&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true);
        let response = await fetch(url);
        let data = await response.json(); // Wait for the JSON data
        setArticles(data.articles);
        setLoading(false);
        setTotalResults(data.totalResults);
        props.setProgress(100);

    }

    useEffect(() => {
        updateNews();
    }, [])

    const handleNextClick = async () => {
        setPage(page + 1);
        updateNews();
    }


    const handlePrevClick = async () => {
        setPage(page - 1);
        updateNews();
    }
    const fetchMoreData = async () => {

        setPage(page + 1);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=ca37f961caad4a8f8e3e9e092d6f6ac1&page=${page}&pageSize=${props.pageSize}`;
        let response = await fetch(url);
        let data = await response.json(); // Wait for the JSON data
        setArticles(articles.concat(data.articles));
        setTotalResults(data.totalResults)
    };



    return (
        <>

            <h1 className='text-center my-3'>Hassan-News Top {capitalizeFirstLetter(props.category)} Headlines </h1>
            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}>
                <div className='container'>
                    <div className='row'>
                        {articles.map((element) => {
                            return <div className='col-md-4' key={element.url}>
                                <NewsItem
                                    title={element.title ? element.title.slice(0, 50) : "..."}
                                    descriprion={element.description ? element.description.slice(0, 100) : "..."}
                                    imgUrl={element.urlToImage}
                                    newsUrl={element.url}
                                    author={element.author}
                                    date={element.publishedAt}
                                    source={element.source.name} />
                            </div>
                        })}
                    </div>
                </div>
            </InfiniteScroll>
        </>

    )

}

News.defaultProps = {
    country: 'us',
    pageSize: 8,
    category: 'general'
};

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
};

export default News