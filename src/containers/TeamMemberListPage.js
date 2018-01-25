import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import { grey500} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Table,TableBody,TableHeader,TableHeaderColumn,TableRow,TableRowColumn} from 'material-ui/Table';

import { connect } from 'react-redux';
import {teamMemberActions} from '../actions';


const styles={
 flatBtn: {
    fill: grey500,
    float: 'right',
  },
  main:{
    marginLeft:20,
  },
};

//---------------------------------------------------
//
//         TEAM MEMBER LIST PAGE
//
//---------------------------------------------------
class TeamMemberListPage extends React.Component {
  componentDidMount() {
    const {dispatch} = this.props;

    var resp = dispatch(teamMemberActions.getAll());
  }
  render() {
    // console.log(`---> render got team members: ${  JSON.stringify(this.props.teamMember)}`);
    var tableBody = [];
      if (this.props.teamMember) {
        for (var i = 0; i < this.props.teamMember.length; i++) {
          // console.log(`teamMember ${  i + 1  }:${  JSON.stringify(this.props.teamMember[i])}`);
          var member = this.props.teamMember[i];
          tableBody.push(
            <TableRow key={i+1} >
              <TableRowColumn style={{width: '50px'}}>{i+1}</TableRowColumn>
              <TableRowColumn>{member.user.first_name} {member.user.last_name}</TableRowColumn>
              <TableRowColumn>{member.user.email}</TableRowColumn>
              <TableRowColumn>{member.team.name }</TableRowColumn>
            </TableRow>
          );
        }
      }
    return (
      <MuiThemeProvider>
        {this.props.alert.message}
        <div style={styles.main}>
          <FlatButton
              label="Invite Team Member"
              style={styles.flatBtn}
              href="/createTeamMember"
          />
          <h2>Team</h2>
          <Table onRowSelection={this.handleRowSelection} >
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn style={{width: '50px'}}>#</TableHeaderColumn>
                <TableHeaderColumn>User</TableHeaderColumn>
                <TableHeaderColumn>Email</TableHeaderColumn>
                <TableHeaderColumn>Team</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {tableBody}
            </TableBody>
          </Table>
        </div>
      </MuiThemeProvider>
      );
    }
  }

function mapStateToProps(state) {
  const{alert}=state;
  console.log(`---> TeamListPage got state: ${  JSON.stringify(state.teamMember)}` );
  return {
    alert,
    teamMember: state.teamMember
 };
}
 
const connectedTeamMemberListPage = connect(mapStateToProps)(TeamMemberListPage);
export { connectedTeamMemberListPage as TeamMemberListPage };
