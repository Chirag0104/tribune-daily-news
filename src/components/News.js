import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'

export class news extends Component {
  static defaultProps = {
    country : 'in',
    pageSize : 8
  }
  static propTypes = {
    country:PropTypes.string,
    pageSize: PropTypes.number,
    category:PropTypes.string
  }

  constructor(){
    super();
    // console.log("Hello")
    this.state = {
      articles : [],
      loading: false,
      page:1,
      
    }
}

async componentDidMount(){
  let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=4c906afe61164e86a0820c8c8de5dea1&page=1&pageSize=${this.props.pageSize}`;
  this.setState({loading:true})
  let data = await fetch(url);
  let parsedData = await data.json()
  this.setState({articles : parsedData.articles , totalResults:parsedData.totalResults , loading:false})
}

handlePreviousClick = async () => {
  let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=4c906afe61164e86a0820c8c8de5dea1&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
  this.setState({loading:true})
  let data = await fetch(url);
  let parsedData = await data.json()

  this.setState({
    page: this.state.page - 1,
    articles : parsedData.articles,
    loading:false
  })
}

handleNextClick = async ()=> {
  if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){}
  
  let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=4c906afe61164e86a0820c8c8de5dea1&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
  this.setState({loading:true})
  let data = await fetch(url);
  let parsedData = await data.json()

  this.setState({
    page: this.state.page + 1,
    articles : parsedData.articles,
    loading:false
  })

}
  render() {
    return (
      <div className="container my-3"> 
        <h1 className="text-center">Top Headlines</h1>
        {this.state.loading && <Spinner />}
        
        <div className="row">
          {!this.state.loading && this.state.articles?.map((element) => {
            
            return <div className="col-md-3" key={element.url}>
            <NewsItem  title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage?element.urlToImage:"https://techcrunch.com/wp-content/uploads/2023/09/GettyImages-497036450.jpg?resize=1200,800"} newsUrl={element.url} author={element.author?element.author:"Unknown"} date={element.publishedAt} source={element.source.name?element.source.name:"Unknown"}/>
            </div>


          })}
          
        </div>
        <div className="container d-flex justify-content-between">
        <button type="button" disabled={this.state.page<=1} onClick={this.handlePreviousClick} className="btn btn-dark">  &larr; Previous</button>
        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/20)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
        
      </div>
    )
  }
}

export default news
