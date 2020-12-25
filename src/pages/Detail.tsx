import React from 'react';

class DetailShow extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      // articleId: ''
    };
  }

  componentDidMount() {}

  // getDetailInfo(articleId: string): void {
  //   // this.setState({ 'articleId': articleId })
  //   // console.log(this.state.articleId)
  // }

  render() {
    // this.getDetailInfo(this.props?.match?.params?.id)
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is.</h2>
      </div>
    );
  }
}

export default DetailShow;
