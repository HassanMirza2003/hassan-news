import React, { Component } from 'react'

export class NewsItem extends Component {
    
    render() {
        let { title, descriprion , imgUrl , newsUrl} = this.props
        return (
            <div className='my-3'>
                <div className="card" style={{ width: '18rem' }}>
                    <img src={!imgUrl?"https://www.usatoday.com/gcdn/authoring/authoring-images/2023/07/21/USAT/70443092007-ap-british-open-golf-15.jpg?crop=2779,1570,x0,y0&width=2779&height=1570&format=pjpg&auto=webp":imgUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{descriprion}</p>
                        <a href= {newsUrl} target='blank' className="btn btn-sm btn-dark">Read More</a>
                    </div>
                </div>
            </div>

        )
    }
}

export default NewsItem