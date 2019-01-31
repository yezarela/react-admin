import React, { Component } from 'react';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import './Overview.css';

class Overview extends Component<any, any> {
  state = {
    showCard: true
  };

  hideCard = () => {
    this.setState({ showCard: false });
  };

  render() {
    const { showCard } = this.state;
    const bull = <span className="bullet">•</span>;

    return (
      showCard && (
        <div>
          <Card className="card">
            <CardContent>
              <Typography className="title" color="textSecondary">
                Word of the Day
              </Typography>
              <Typography variant="headline" component="h2">
                be{bull}nev{bull}o{bull}lent
              </Typography>
              <Typography className="pos" color="textSecondary">
                adjective
              </Typography>
              <Typography component="p">
                well meaning and kindly.
                <br />
                {'a benevolent smile'}
              </Typography>
            </CardContent>

            <CardActions>
              <Button size="small" onClick={this.hideCard}>
                Dismiss
              </Button>
            </CardActions>
          </Card>
        </div>
      )
    );
  }
}

export default Overview;
