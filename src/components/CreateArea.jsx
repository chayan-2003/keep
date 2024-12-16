import React, { useState } from "react";
import { TextField, Button, Container, Paper, Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  form: {
    marginBottom: theme.spacing(4),
  },
  input: {
    marginBottom: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
  },
  note: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  deleteButton: {
    marginTop: theme.spacing(1),
  },
}));

function CreateArea() {
  const classes = useStyles();
  const [note, setNote] = useState([]);
  const [temp, setTemp] = useState({ title: "", content: "" });

  function typing(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setTemp((prevTemp) => ({
      ...prevTemp,
      [name]: value,
    }));
  }

  function clicked(e) {
    e.preventDefault();
    setNote((prev) => {
      return [...prev, temp];
    });
    setTemp({ title: "", content: "" });
  }

  function deleteNote(index) {
    setNote((prevNotes) => prevNotes.filter((noteItem, i) => i !== index));
  }

  return (
    <Container maxWidth="sm">
      <form className={classes.form} noValidate autoComplete="off">
        <TextField
          name="title"
          label="Title"
          variant="outlined"
          fullWidth
          onChange={typing}
          value={temp.title}
          className={classes.input}
        />
        <TextField
          name="content"
          label="Take a note..."
          variant="outlined"
          fullWidth
          multiline
          rows={3}
          onChange={typing}
          value={temp.content}
          className={classes.input}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={clicked}
          className={classes.button}
        >
          Add
        </Button>
      </form>
      <Grid container spacing={2}>
        {note.map((value, index) => (
          <Grid item xs={12} key={index}>
            <Paper className={classes.note}>
              <Typography variant="h6">{value.title}</Typography>
              <Typography variant="body1">{value.content}</Typography>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => deleteNote(index)}
                className={classes.deleteButton}
              >
                Delete
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default CreateArea;