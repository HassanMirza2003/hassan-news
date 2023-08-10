import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';


export class News extends Component {
    static defaultProps = {
        country: 'us',
        pageSize: 8,
        category: 'general'
    };

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    };


    articles = [];
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0
        };
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - Hassan-News`;
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    async updateNews() {
        this.props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ca37f961caad4a8f8e3e9e092d6f6ac1&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let response = await fetch(url);
        let data = await response.json(); // Wait for the JSON data
        this.setState({
            articles: data.articles,
            totalResults: data.totalResults,
            loading: false
        });
        this.props.setProgress(100);

    }
    async componentDidMount() {
        this.updateNews();
    }

    handleNextClick = async () => {
        this.setState({ page: this.state.page + 1 });
        this.updateNews();
    }


    handlePrevClick = async () => {
        this.setState({ page: this.state.page - 1 });
        this.updateNews();
    }
    fetchMoreData = async () => {

        this.setState({ page: this.state.page + 1 });
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ca37f961caad4a8f8e3e9e092d6f6ac1&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let response = await fetch(url);
        let data = await response.json(); // Wait for the JSON data
        this.setState({
            articles: this.state.articles.concat(data.articles),
            totalResults: data.totalResults,
        });
    };


    render() {
        return (
            <>

                <h1 className='text-center my-3'>Hassan-News Top {this.capitalizeFirstLetter(this.props.category)} Headlines </h1>
                {this.state.loading && <Spinner />}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />}>
                    <div className='container'>
                        <div className='row'>
                            {this.state.articles.map((element) => {
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
}

export default News