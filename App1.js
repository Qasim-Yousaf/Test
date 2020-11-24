import React ,{Component} from 'react';
import {View ,Text , Image ,ToucableOpacity} from 'react-native';


export default class App1 extends React.Component {

    constructor(props){
        super(props);
        this.state ={
            count:0,
        } 
    }


    componentDidMount(){
        console.log('component Did Mount Call of App1 ...')
        this.inc();

    }


    inc(){
        console.log('handle Inc call ...');

        setInterval(() => {
            this.setState({count:this.state.count+1})
            // console.log('Inc count after 1 sec  in App1  ');            
        }, 10000);
    }

    render() {

        return(
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                {/* <Text>{this.state.count}</Text> */}
                <OtherComp count={this.state.count} />
            </View>
        );
    }
}


class OtherComp extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            localCount:0,
        }

    }

    componentWillReceiveProps(nextProps){
        console.log('coming props in the other component  --->  ',nextProps);
        this.setState({localCount:nextProps.count})
    }
    componentDidMount(){
        console.log('component Did Mount Call of App2 ======...')
        

    }

    shouldComponentUpdate(nextProps ,nextState){
        console.log('shouldComponentUpdate    NextProps is ----  ',nextProps);
        console.log('shouldComponentUpdate    nextState is ----  ',nextState);


        return !(nextProps.count%2)
        // only update when even number is occur

    }

    componentDidUpdate(nextProps , nextState){
        console.log('----------------');
        console.log('componentDidUpdate    NextProps is ----  ',nextProps);
        console.log('componentDidUpdate    nextState is ----  ',nextState);

    }

    render(){
        console.log('render in app2 ======');
        return(
        <Text>{this.state.localCount}</Text>   
        );
    }
}
