import React from "react";
//import { Input, InputGroup } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';
import {InputGroup, Input , InputGroupText} from 'reactstrap';
import { Modal, Button, ButtonToolbar, Placeholder } from 'rsuite';
import {Row, Col , Card, CardTitle , CardText } from 'reactstrap' ;


// things related to the search bar componenth

const styles = {
    width: 350,
    marginBottom: 10,
    '.focus' :  { 
      outline:'none'

    } , 
    outline:'none !important'

  };


export const SearchBar = (props) => { 
    // sample  of a simple seaerch bar component
    // const [open, setOpen] = React.useState(false);
    // const handleOpen = () => setOpen(true);
    // const handleClose = () => setOpen(false);
    const [inputModalState , setImS]  = React.useState(false);

    const handleChange  = (ev) => { 
      console.log(props.searchObject);


      if (ev.target.value == '') { 
          
        console.log(ev.target.value);

        // we have to activated the search pannel;
        props.searchObject.sas({
          status:false, 
          value: ev.target.value
        });

      } else { 

        props.searchObject.sas({
          status:true, 
          value: ev.target.value
        });


      }


    }

    // const handleChange = () => { 

    //   if (inputModalState) { 

    //       console.log('everthing is good ');
    //       return;

    //   }

    //   handleOpen();
    //   setImS(!inputModalState);

    // }



return (<React.Fragment>
<InputGroup>
    <InputGroupText className="searchLable border-add-black">
    Search !
    </InputGroupText>
    <Input className="searchInputStuff" onChange={handleChange} value={props.searchObject.asv.value} />
  </InputGroup>
</React.Fragment>)


}


export const SearchPanel = (props) => { 
        // some search representaetion of averythign : means link to the component and it's data;
        // gonna show the search as a modal;

        // we can have the object status value maybe available somehow 


        const handleClick = () => { 

          props.searchValue.sas({status:false, value :''});


        }


        return (<React.Fragment>


      <Row className="d-flex justify-content-center pd-searchBox">
  <Col sm="6" className="d-flex justify-content-center w-100 mt-10 searchPanelHeight ">
    <Card body className="w-100">
      <Button onClick = {handleClick} className="w-2"></Button>
      <CardTitle tag="h5">

       
      </CardTitle>
      <CardText>
        {props.searchValue.asv.value}
      </CardText>
      <Button>
        Go somewhere
      </Button>
    </Card>
  </Col>
</Row>

        </React.Fragment>)
}