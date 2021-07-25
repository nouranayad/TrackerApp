import React,{useState} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import request from "superagent";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


import Alert from '@material-ui/lab/Alert';
const useStyles = makeStyles((theme) => ({
    
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
const useTempStyle = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1.8),
    minWidth: 399,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
const useAlarmStyle = makeStyles((theme) => ({
  root: {
    minWidth: 399,
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));
const Form = () =>  {
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    // const [temp,setTemp] = useState("");
   const [error,setError]=useState(false)
   const [missingName,setMissingName]=useState(false)
   const [missingEmail,setMissingEmail]=useState(false)
   const [missingTemp,setMissingTemp]=useState(false)
const [emailError,setEmailError]=useState(false)

   const [submited,setSubmited]=useState(false)
   const [temp, setTemp] = React.useState('');


   const handleChange = (event) => {
    setTemp(event.target.value);
  };
  const alarmClasses=useAlarmStyle()
  const tempClasses=useTempStyle()
  const classes = useStyles();
  const getUserGeolocationDetails = () => {
    if(name==""){
      setMissingName(true);

    }
    else{
      setMissingName(false)
    }
    if(email==""){
      setMissingEmail(true)
    }
    else{
      setMissingEmail(false)

    }
    if(temp==""){
      setMissingTemp(true)
    }
    else{
      setMissingTemp(false)

    
    fetch(
        "https://geolocation-db.com/json/0f761a30-fe14-11e9-b59f-e53803842572"
    )
        .then(response => response.json())
        .then(function(data){
          request
          .post('http://localhost:5000/routes/User/create')
            .set('Content-Type', 'application/x-www-form-urlencoded')
          .send({ name: name, email: email ,temperature:temp,long:data.longitude,lat:data.latitude})
          .end(function(err, res){
            if(res.body.msg=="This email is already used"){
              setError(true);
            }
            else{
              if(res.body.msg=="Wrong Email!"){
                setEmailError(true);
              }
              else{
                setName("")
                setEmail("")
                setTemp("")
                setError(false);
                setSubmited(true);
                setEmailError(false)
              }
            }
            
            setTimeout(() => setSubmited(false), "1000");


            })
          })
         
       
        } 
      }    

 

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        
        <Typography component="h1" variant="h5">
          PLEASE ENTER YOUR DATA
        </Typography>
            {/* <form className={classes.form} noValidate > */}
        <TextField
            variant="outlined"
            margin="normal"
            required={true} 
            fullWidth
            name="name"
            label="Name"
            type="name"
            id="name"
            autoComplete="current-password"
            value={name}
          onChange={e => setName(e.target.value)}
          />
           <div className={alarmClasses.root}>
             {missingName &&
      <Alert variant="filled" severity="error">
        Please enter name!
      </Alert>}
      
    </div>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
          onChange={e => setEmail(e.target.value)}
          />
           <div className={alarmClasses.root}>

          {missingEmail &&
      <Alert variant="filled" severity="error">
        Please enter email!
      </Alert>}
      {emailError &&
      <Alert variant="filled" severity="error">
        Wrong Email!
      </Alert>}
      </div>

    <FormControl variant="outlined" className={tempClasses.formControl}>
        <InputLabel  required id="demo-simple-select-outlined-label">Temperature</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={temp}
          onChange={handleChange}
          label="Temp"
          

        >
         
          <MenuItem value={36}>36&deg;C</MenuItem>
          <MenuItem value={36.5}>36.5&deg;C</MenuItem>
          <MenuItem value={37}>37&deg;C</MenuItem>
          <MenuItem value={37.5}>37.5&deg;C</MenuItem>
          <MenuItem value={38}>38&deg;C</MenuItem>
          <MenuItem value={38.5}>38.5&deg;C</MenuItem>
          <MenuItem value={39}>39&deg;C</MenuItem>
          <MenuItem value={39.5}>39.5&deg;C</MenuItem>
          <MenuItem value={40}>40&deg;C</MenuItem>
          <MenuItem value={40.5}>40.5&deg;C</MenuItem>
          <MenuItem value={41}>41&deg;C</MenuItem>
          <MenuItem value={41.5}>41.5&deg;C</MenuItem>
          <MenuItem value={42}>42&deg;C</MenuItem>
          <MenuItem value={42.5}>42.5&deg;C</MenuItem>


        </Select>
      </FormControl>
      <div className={alarmClasses.root}>
      
      {missingTemp &&
      <Alert variant="filled" severity="error">
        Please enter temperature!
      </Alert>}
      </div>

    </div>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            // onClick={() => { setLong(1)}}
            onClick={getUserGeolocationDetails}
          >
            Submit 
          </Button>

          {submited &&
          <Alert severity="success">Your data is added successfully!</Alert>
          }

          {error &&
          <Alert severity="error">This email is already used!</Alert>
          }

      
    </Container>
  );
}
export default Form;


