# Elementary Editor

A WYSWYG editor based on DraftJS and Ant.Design.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See usage for notes on how to use elementary-editor in your project.

### Prerequisites

You will need:   
  - NodeJS
  - [Yarn](https://yarnpkg.com/lang/en/) 

### Installing

- Position yourself in the root folder of the project.

- Install packages using yarn or npm:

```
yarn install
```

- start the project:

```
yarn start
```

- to get a production build type:

```
yarn build
```

## Running the tests

To run the tests, use the test script. 

```
yarn test
```

## Usage

To use this editor in your project: 

- Install the npm package: 

```
yarn add elementary-editor
```

- Import the editor and use in on your code:

```
import Editor from 'elementary-editor';

class MyComponent extends Component  {
 /*
 ...
 */
 render() {
  return(
   <div>
     <Editor 
	   initialState={null} 
	   ref={(editor) => this.editor = editor}
	 />   
   );
 } 
}
```

The ref property is needed if you want to access the editor's internal methods.

## API

## Properties

<table class="table table-bordered table-striped">
  <thead>
    <tr>
      <th style="width: 100px;">Name</th>
      <th style="width: 50px;">Type</th>
      <th>Default</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>initialState</td>
      <td>JSON string</td>
      <td>null</td>
      <td>
	  A draft-js rawState object with the initial state of the editor. If set to null it will initialize the editor with no text.
	  </td>
    </tr>   
	<tr>
      <td>filterStyles (optional)</td>
      <td>string[]</td>
      <td>null</td>
      <td>
	  A list of the styles the editor will use. If set it will only use those styles. If the parameter is null or isn't specified, all the available styles will be used.
	  </td>
    </tr>   
  </tbody>
</table>

## Methods

Internal editor methods.

<table class="table table-bordered table-striped">
  <thead>
    <tr>
      <th style="width: 100px;">Name</th>
      <th style="width: 50px;">Parameters</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>getContent</td>
      <td> - </td>
      <td>
	    Gets the current DraftJS raw editor state.
	  </td>
    </tr>   
	<tr>
      <td>clear</td>
      <td> - </td>
      <td>
		Clears the editor.
	  </td>
    </tr>	
  </tbody>
</table>


## Built With

* [React](https://facebook.github.io/react/) - A Javascript library for building user interfaces.
* [DraftJS](https://draftjs.org/) - Rich text editor framework for React.
* [Ant.Design](https://ant.design/) - A UI Design Language.

<!---
## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 
-->

## Authors

* **Federico Caminiti** - *Maintainer*

<!---
See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.
-->

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE.md) file for details