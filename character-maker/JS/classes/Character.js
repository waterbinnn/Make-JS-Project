import { ABILITY, JOB } from "../data.js";
import Person from "./Person.js";

export default class Character extends Person {
  job = JOB.PROGRAMMER;
  ability = ABILITY.RUN_FAST;

  constructor({ job, ability, hair, body }) {
    super(hair, body);

    this.changeJob(job);
    this.changeAbility(ability);
  }

  changeJob(job) {
    if (job in JOB) {
      this.job = job;
    }
  }

  changeAbility(ability) {
    if (ability in ABILITY) {
      this.ability = ability;
    }
  }

  get introduction() {
    return `
      đđťââď¸ My Job is '${JOB[this.job]}' ! 
      đĽ My Ability is '${ABILITY[this.ability]}'~! 
      đŞ And my body is ${this.body}. 
      đââď¸ Also my hairstyle is ${this.hair} !
    `;
  }

  showOff() {
    alert(`ëë ěľęł ě ${this.job}ě´ěź!`);
  }

  showSkill() {
    alert(`ę°ë¤! ${this.ability}!!`);
  }
}
