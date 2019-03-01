import { Component, OnInit } from '@angular/core';
import { QuestionItem, QuestionOptionItem, ScoutingData, ResponseData, PrevNoteItem } from '../../../interfaces/match';
import { Team } from '../../../interfaces/team';
import { Scout } from '../../../interfaces/scout';
import { ScoutDataService } from '../../../services/scout-data.service';
import { TeamDataService } from '../../../services/team-data.service';
import { MatchscoutingDataService } from '../../../services/matchscouting-data.service';


@Component({
  selector: 'app-matchscouting',
  templateUrl: './matchscouting.page.html',
  styleUrls: ['./matchscouting.page.scss'],
})
export class MatchscoutingPage implements OnInit {

  public MatchNum: number = 1;
  public TeamNum: number = 0;
  public actScoutId: number = 0;
  public actScoutName: string = '';

  public matchNoArr: string[] = []
  public scouts: Scout[] = [];
  public teams: Team[] = [];

  public matchNote: string = '';

  public previousMatchNotes: PrevNoteItem[] = [];

  public scoutingDataId: number = 0;

  questions: {
    Sandstorm: QuestionItem[],
    Teleop: QuestionItem[],
    EndGame: QuestionItem[]
  } = {

      Sandstorm: [
        {
          id: 'SQ1',
          questionText: 'What level did they start from?',
          questionType: 2,
          questionItems: [{
            value: 1,
            itemText: 'level 1',
          },
          {
            value: 2,
            itemText: 'level 2'
          }
          ],
          answer: ''
        },
        {
          id: 'SQ2',
          questionText: 'What game peice did they start with?',
          questionType: 2,
          questionItems: [{
            value: 1,
            itemText: 'Hatch'
          },
          {
            value: 2,
            itemText: 'Cargo'
          }
          ],
          answer: ''
        },
        {
          id: 'SQ3',
          questionText: 'How many hatches were placed?',
          questionType: 1,
          questionItems: [],
          answer: 0,
        },
        {
          id: 'SQ4',
          questionText: 'What level did they place the hatch',
          questionType: 2,
          questionItems: [{
            value: 1,
            itemText: 'Cargo Ship'
          },
          {
            value: 2,
            itemText: 'Rocket Ship LV1'
          },
          {
            value: 3,
            itemText: 'Rocket Ship LV2'
          },
          {
            value: 4,
            itemText: 'Rocket Ship LV3'
          }
          ],
          answer: ''
        },
        {
          id: 'SQ5',
          questionText: 'How much Cargo was placed?',
          questionType: 1,
          questionItems: [],
          answer: 0
        },
        {
          id: 'SQ6',
          questionText: 'What level did they place the cargo?',
          questionType: 2,
          questionItems: [{
            value: 1,
            itemText: 'Cargo Ship'
          },
          {
            value: 2,
            itemText: 'Rocket Ship LV1'
          },
          {
            value: 3,
            itemText: 'Rocket Ship LV2'
          },
          {
            value: 4,
            itemText: 'Rocket Ship LV3'
          }
          ],
          answer: ''
        }
      ],

      Teleop: [{
        id: 'TQ1',
        questionText: 'How many hatches were placed?',
        questionType: 1,
        questionItems: [],
        answer: 0
      },
      {
        id: 'TQ2',
        questionText: 'What was the highest level they acheived?',
        questionType: 2,
        questionItems: [{
          value: 1,
          itemText: 'Cargo ship'
        },
        {
          value: 2,
          itemText: 'Rocket ship LV1'
        },
        {
          value: 3,
          itemText: 'Rocket ship LV2'
        },
        {
          value: 4,
          itemText: 'Rocket ship LV3'
        }
        ],
        answer: ''
      },
      {
        id: 'TQ3',
        questionText: 'How much cargo was placed?',
        questionType: 1,
        questionItems: [],
        answer: 0
      },
      {
        id: 'TQ4',
        questionText: 'How do they pickup hatches?',
        questionType: 2,
        questionItems: [{
          value: 1,
          itemText: 'The Floor'
        },
        {
          value: 2,
          itemText: 'Feeder'
        },
        {
          value: 3,
          itemText: 'Both'
        }
        ],
        answer: ''
      },
      {
        id: 'TQ5',
        questionText: 'Cycle time',
        questionType: 2,
        questionItems: [{
          value: 1,
          itemText: '<10s'
        },
        {
          value: 2,
          itemText: '10-20s'
        },
        {
          value: 3,
          itemText: '>20s'
        }
        ],
        answer: ''
      }
      ],

      EndGame: [
        {
          id: 'EQ1',
          questionText: 'What level did they acheive?',
          questionType: 2,
          questionItems: [{
            value: 1,
            itemText: 'No attempt'
          },
          {
            value: 2,
            itemText: 'LV1'
          },
          {
            value: 3,
            itemText: 'LV2'
          },
          {
            value: 4,
            itemText: 'LV3'
          }
          ],
          answer: ''
        },
        {
          id: 'EQ2',
          questionText: 'How long did they take?',
          questionType: 2,
          questionItems: [{
            value: 1,
            itemText: '0s'
          },
          {
            value: 2,
            itemText: '<5s'
          },
          {
            value: 3,
            itemText: '5-15s'
          },
          {
            value: 4,
            itemText: '>15s'
          }
          ],
          answer: ''
        }/*,
    {
      id: 'EQ3',
      questionText: 'Did another team assist them?',
      questionType: 2,
      questionItems: [{
        value: 1,
        itemText: 'Yes'
      },
      {
        value: 2,
        itemText: 'No'
      }
      ],
      answer: ''
    }*/
      ]
    }



  constructor(
    public scoutData: ScoutDataService,
    private teamDataService: TeamDataService,
    private scoutingData: MatchscoutingDataService
  ) {
    this.teamDataService.teams.subscribe((data) => {
      this.teams = data;
    });

    this.scoutData.scouts.subscribe((data) => {
      this.scouts = data;
    });

    this.scoutingData.prevComments.subscribe((data) => {
      this.previousMatchNotes = data;
    });

    // Create list for the match numbers
    var i: number;
    for (i = 1; i <= 64; i++) {
      var matchNoItem: string;
      matchNoItem = 'Q' + i;
      this.matchNoArr.push(matchNoItem);
    }
  }

  ngOnInit() {

  }

  private loadPreviousComments(teamNo: number) {
    this.scoutingData.loadPreviousNotes(teamNo);
  }

  ionViewWillEnter() {
    this.scoutData.load();
  }


  public valueMinus(questionSection: number, numValue: number) {
    //console.log("valueMinus called: QS=" + questionSection + "  numValue="+ numValue);
    switch (questionSection) {
      case 0:
        // SandStorm
        if (this.questions.Sandstorm[numValue].answer > 0) {
          this.questions.Sandstorm[numValue].answer--;
        }
        break;
      case 1:
        // SandStorm
        if (this.questions.Teleop[numValue].answer > 0) {
          this.questions.Teleop[numValue].answer--;
        }
        break;
      case 2:
        // SandStorm
        if (this.questions.EndGame[numValue].answer > 0) {
          this.questions.EndGame[numValue].answer--;
        }
        break;
    }
  }

  public valuePlus(questionSection: number, numValue: number) {
    //console.log("valuePlus called: QS=" + questionSection + "  numValue="+ numValue);
    switch (questionSection) {
      case 0:
        // SandStorm
        this.questions.Sandstorm[numValue].answer++;
        break;
      case 1:
        // Teleop
        this.questions.Teleop[numValue].answer++;
        break;
      case 2:
        // EndGame
        this.questions.EndGame[numValue].answer++;
        break;
    }
  }

  public updateScoutName() {
    var tmpScout: Scout;

    tmpScout = this.scouts.find(scout => scout.scout_id == this.actScoutId);
    if (tmpScout != null) {
      this.actScoutName = tmpScout.firstname + ' ' + tmpScout.lastname;
    } else {
      this.actScoutName = '';
    }



  }


  public loadScoutData() {
    this.scoutingData.read(this.MatchNum, this.TeamNum, this.actScoutId).then((data) => {
      console.log('Matchscoutin: received data:');
      console.log(data.data);

      // Save database record id, it will be required for the update
      this.scoutingDataId = data.id;

      if (data.data != null) {
        // Restore saved answers from the received data
        data.data.forEach((response) => {
          this.questions.Sandstorm.forEach((question) => {
            if (question.id == response.id) {
              question.answer = response.response;
            }
          });

          this.questions.Teleop.forEach((question) => {
            if (question.id == response.id) {
              question.answer = response.response;
            }
          });

          this.questions.EndGame.forEach((question) => {
            if (question.id == response.id) {
              question.answer = response.response;
            }
          });

        });
      } else {
        this.resetScoutData();
      }

      // Restore note
      this.matchNote = data.note;
    });

    // Load previos notes
    this.loadPreviousComments(this.TeamNum);
  }

  /**
   * Setting the answers to 0 or ''
   */
  public resetScoutData() {
    this.questions.Sandstorm.forEach((question) => {
      switch (question.questionType) {
        case 1:
        case 2:
          question.answer = 0;
          break;
        default:
          question.answer = '';
      }
    });

    this.questions.Teleop.forEach((question) => {
      switch (question.questionType) {
        case 1:
        case 2:
          question.answer = 0;
          break;
        default:
          question.answer = '';
      }
    });

    this.questions.EndGame.forEach((question) => {
      switch (question.questionType) {
        case 1:
        case 2:
          question.answer = 0;
          break;
        default:
          question.answer = '';
      }
    });

    this.matchNote = '';
  }

  public save() {
    var scoutingData: ScoutingData = {
      id: this.scoutingDataId,
      match_id: this.MatchNum,
      team_no: this.TeamNum,
      scout_id: this.actScoutId,
      data: [],
      note: this.matchNote
    };

    console.log('sctScoutId: ' + scoutingData.scout_id);

    //Save Sandstorm answers
    this.questions.Sandstorm.forEach((question) => {
      var response: ResponseData = { id: '', response: '' };
      response.id = question.id;
      response.response = question.answer;

      scoutingData.data.push(response);
    });

    //Save Teleop answers
    this.questions.Teleop.forEach((question) => {
      var response: { id: string, response: any } = { id: '', response: '' };
      response.id = question.id;
      response.response = question.answer;

      scoutingData.data.push(response);
    });

    //Save EndGame answers
    this.questions.EndGame.forEach((question) => {
      var response: { id: string, response: any } = { id: '', response: '' };
      response.id = question.id;
      response.response = question.answer;

      scoutingData.data.push(response);
    });


    console.log(scoutingData);
    this.scoutingData.save(scoutingData).then(() => {
      console.log('Scouting data saved');
    });
  }

  public saveNext() {
    this.save();
    this.resetScoutData();
    this.MatchNum++;
    this.TeamNum = 0;
  }
}
