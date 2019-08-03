import React from "react";

export default class TagInput extends React.Component {
  tag = React.createRef()

  state = {
    tags: []
  }

  addTag = (e) => {
    e.preventDefault();
    const _name_ = this.tag.current.value;
    this.setState(prevState => {
      if (!prevState.tags.find(({ name }) => name === _name_ )) {
        prevState.tags.push({ name: _name_ });
        this.props.onUpdate(prevState.tags);
        this.tag.current.value = "";
      }
      return prevState;
    });
  }

  removeTag = (_name_) => {
    this.setState(prevState => {
      prevState.tags = prevState.tags.filter(({ name }) => name !== _name_);
      this.props.onUpdate(prevState.tags);
      return prevState;
    });
  }

  render() {
    return(
      <div id="tags">
        {this.state.tags.map(({ name }, i) => (
          <span className="tag" key={i} >
            {name}
            <span className="remove-tag" onClick={() => this.removeTag(name) }>×</span>
          </span>
        ))}
        {this.state.tags.length < 3 ?
          <form onSubmit={this.addTag} id="tag-form" >
            <input id="tag-input" ref={this.tag} placeholder="Add a topic..." />
          </form>
          : null}
      </div>
    )
  }
}


// ××
