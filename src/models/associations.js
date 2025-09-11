const User = require('./user');
const Participant = require('./participant');
const Activity = require('./activity');
const Attendance = require('./attendance');

Participant.belongsToMany(Activity, {
    through: Attendance,
    foreignKey: 'participant_id',
    otherKey: 'activity_id',
    as: 'activities'
});

Activity.belongsToMany(Participant, {
    through: Attendance,
    foreignKey: 'activity_id',
    otherKey: 'participant_id',
    as: 'participants'
});

Participant.hasMany(Attendance, {
    foreignKey: 'participant_id',
    as: 'attendances'
});

Activity.hasMany(Attendance, {
    foreignKey: 'activity_id',
    as: 'attendances'
});

Attendance.belongsTo(Participant, {
    foreignKey: 'participant_id',
    as: 'participant'
});

Attendance.belongsTo(Activity, {
    foreignKey: 'activity_id',
    as: 'activity'
});

module.exports = {
    User,
    Participant,
    Activity,
    Attendance
};