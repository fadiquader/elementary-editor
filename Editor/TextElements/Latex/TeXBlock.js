/**
 * Copyright (c) 2013-present, Facebook, Inc. All rights reserved.
 *
 * This file provided by Facebook is for non-commercial testing and evaluation
 * purposes only. Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import katex from 'katex';
import React from 'react';
import { Button, Input } from 'antd';
import { Icon } from 'react-fa';

const { TextArea } = Input;

const EditorButtons = ({invalid, removeFn, saveFn}) => {
		
	if(invalid)
	    return(
		<Button.Group size="large" style={{marginLeft:'40%'}}>
			<Button type="danger" onClick={removeFn}>
				<Icon name="close" size="lg" />
				&nbsp; Remove
			</Button>
			<Button disabled>
				Invalid TeX
			</Button>
		</Button.Group>
		);	 	
	else
	    return(
		<Button.Group size="large" style={{marginLeft:'40%'}}>
			<Button type="danger" onClick={removeFn}>
				<Icon name="close" size="lg" />
				&nbsp; Remove
			</Button>
			<Button type="primary" onClick={saveFn}>
				Done &nbsp;
			    <Icon name="check" size="lg" />
			</Button>
		</Button.Group>
		);	 	
}

class KatexOutput extends React.Component {
  constructor(props) {
    super(props);
    this._timer = null;
  }

  _update() {
    if (this._timer) {
      clearTimeout(this._timer);
    }

    this._timer = setTimeout(() => {
      console.log(this.refs.container);		
      katex.render(
        this.props.content,
        this.refs.container,
        {displayMode: true}
      );
    }, 0);
  }

  componentDidMount() {
    this._update();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.content !== this.props.content) {
      this._update();
    }
  }

  componentWillUnmount() {
    clearTimeout(this._timer);
    this._timer = null;
  }

  render() {
    return <div ref="container" onClick={this.props.onClick} />;
  }
}

export default class TeXBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editMode: false};

    this._onClick = () => {
      if (this.state.editMode) {
        return;
      }

      this.setState({
        editMode: true,
        texValue: this._getValue(),
      }, () => {
        this._startEdit();
      });
    };

    this._onValueChange = evt => {
      var value = evt.target.value;
      var invalid = false;
      try {
        katex.__parse(value);
      } catch (e) {
        invalid = true;
      } finally {
        this.setState({
          invalidTeX: invalid,
          texValue: value,
        });
      }
    };

    this._save = () => {	  
      var entityKey = this.props.block.getEntityAt(0);
      var newContentState = this.props.contentState.mergeEntityData(entityKey, {content: this.state.texValue});
      this.setState({
        invalidTeX: false,
        editMode: false,
        texValue: null,
      }, this._finishEdit.bind(this, newContentState));
    };

    this._remove = () => {
      this.props.blockProps.onRemove(this.props.block.getKey());
    };
    this._startEdit = () => {
      this.props.blockProps.onStartEdit(this.props.block.getKey());
    };
    this._finishEdit = (newContentState) => {
      this.props.blockProps.onFinishEdit(this.props.block.getKey(), newContentState);
    };
  }

  _getValue() {
    return this.props.contentState
      .getEntity(this.props.block.getEntityAt(0))
      .getData()['content'];
  }

  render() {
	
    var texContent = null;
	
    if (this.state.editMode) 
	  texContent = (this.state.invalidTeX ? '' : this.state.texValue);
	else 
	  texContent = this._getValue();

    var className = 'TeXEditor-tex';
    if (this.state.editMode) {
      className += ' TeXEditor-activeTeX';
    }

    var editPanel = null;
    if (this.state.editMode) {
      
      editPanel =
        <div>
		         		 
		  <TextArea 
			rows={2} 
			style={{width:'20%', marginLeft:'40%'}}
			onChange={this._onValueChange} 
			value={this.state.texValue}
		  />
		  
          <div>
			<EditorButtons 
				invalid={this.state.invalidTeX} 
				removeFn={this._remove}
				saveFn={this._save}
			/>		   		  		  
          </div>
		  
        </div>;
    }

    return (
      <div className={className}>
        <KatexOutput content={texContent} onClick={this._onClick} />
        {editPanel}
      </div>
    );
  }
}
