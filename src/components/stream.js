import React from "react";
import { Loader } from ".";
import { withApollo } from "react-apollo";


const createStream = (Component) => {
  class Stream extends React.Component {
    state = {
      stream: [],
      more: true,
      n: 0,
      loading: true
    };

    fetchMore = async () => {
      const { query, variables } = this.props;
      let { n } = this.state;
      const { data } = await this.props.client.query({
        query,
        variables: { n, ...variables }
      });
      console.log(data);
      const { more, stream } = this.findStream(data);
      this.setState(prevState => {
        const newStream = prevState.stream.concat(stream);
        n += 1;
        return { stream: newStream, more, n, loading: false }
      })
    }

    findStream(data) {
      const keys = Object.keys(data);
      for (let i = 0; i < keys.length; i++) {
        const childData = data[keys[i]];
        if (childData && typeof childData === 'object') {
          const childChildData = this.findStream(childData);
          if (childData.stream) return childData;
          if (childChildData && childChildData.stream) return childChildData;
        }
      }
    }

    componentDidMount() {
      this.fetchMore();
    }

    componentWillReceiveProps({ stream, more }) {
      this.setState({ stream, more, n: 1 })
    }

    addListener = () => {
      document.addEventListener('scroll', this.endOfStream)
    }

    endOfStream = () => {
      const { loading, more } = this.state;
      const atBottom = document.documentElement.scrollTop + window.innerHeight === document.documentElement.scrollHeight;
      if (atBottom && !loading && more) {
        this.fetchMore()
        this.setState({ loading: true });
        document.removeEventListener('scroll', this.endOfStream);
      }
    }

    render() {
      setTimeout(this.addListener, 100)
      return(
        <div>
          {this.state.stream && this.state.stream.length > 0 ?
            <div className="stream">
              {this.state.stream.map(item => <Component {...item} key={item.id}/>)}
            </div>
            : this.props.onEmpty ? this.props.onEmpty() : null}
          {this.state.loading ? <Loader /> : null}
        </div>
      )
    }
  };
  return withApollo(Stream);
}

export default createStream;
