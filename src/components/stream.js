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
      const res = await this.props.client.query({
        query,
        variables: { n, ...variables }
      });
      const { more, stream } = res.data.reks || res.data.bookmarks || res.data.users || res.data.search.user || res.data.search.podcast;
      this.setState(prevState => {
        const newStream = prevState.stream.concat(stream);
        n += 1;
        return { stream: newStream, more, n, loading: false }
      })
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
          <div className="stream">
            {this.state.stream.map(item => <Component {...item} key={item.id}/>)}
          </div>
          {this.state.loading ? <Loader /> : null}
        </div>
      )
    }
  };
  return withApollo(Stream);
}

export default createStream;
