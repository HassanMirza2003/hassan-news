import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';

export class News extends Component {
    articles = [];
    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1
        };
    }
    async componentDidMount() {
        let url =
            `https://newsapi.org/v2/top-headlines?country=us&category=entertainment&apiKey=ca37f961caad4a8f8e3e9e092d6f6ac1&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let response = await fetch(url);
        let data = await response.json(); // Wait for the JSON data
        this.setState({ articles: data.articles, totalResults: data.totalResults , loading : false});
    }

    handleNextClick = async () => {
        if (!Math.ceil(this.state.page + 1 > this.state.totalResults / this.props.pageSize)) {


            let url =
                `https://newsapi.org/v2/top-headlines?country=us&category=entertainment&apiKey=ca37f961caad4a8f8e3e9e092d6f6ac1&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            this.setState({ loading: true });
            let response = await fetch(url);
            let data = await response.json(); // Wait for the JSON data

            this.setState({
                articles: data.articles,
                page: this.state.page + 1, // Update the page state
                loading: false
            });
        }

    }


    handlePrevClick = async () => {
        let url =
            `https://newsapi.org/v2/top-headlines?country=us&category=entertainment&apiKey=ca37f961caad4a8f8e3e9e092d6f6ac1&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            this.setState({loading : true})
        let response = await fetch(url);
        let data = await response.json(); // Wait for the JSON data
        this.setState({
            articles: data.articles,
            page: this.state.page - 1 ,// Update the page state
            loading : false
        });
    }

    render() {
        return (

            <div className='container my-3' >
                <h1 style={{ fontFamily: "arial", fontWeight: 500 }} className='text-center'>Hassan-News Top Headlines</h1>
                {this.state.loading && <Spinner />}
                <div className='row'>
                    {!this.state.loading && this.state.articles.map((element) => {
                        return <div className='col-md-4' key={element.url}>
                            <NewsItem
                                title={element.title ? element.title.slice(0, 45) : ""}
                                descriprion={element.description ? element.description.slice(0, 88) : ""}
                                imgUrl={element.urlToImage}
                                newsUrl={element.url} />
                        </div>

                    })}

                </div>
                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
                    <button disabled={Math.ceil(this.state.page + 1 > this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
            </div>


        )
    }
}

export default News