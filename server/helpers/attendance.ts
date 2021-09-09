import User, {IUser} from "../../../../server/database/models/user";
import {AttendanceUser} from "../../shared/types/AttendancePageTypes";

const getAttendanceRecords = (user: IUser) : string[] => {
  if(!user?.modules?.admin_attendance || user.modules.admin_attendance.length < 1) return [];
  return user.modules.admin_attendance;
};

export const getAttendances = () : Promise<{attendance: Record<string, AttendanceUser[]>, users: AttendanceUser[]}> => {
  return new Promise<{attendance: Record<string, AttendanceUser[]>, users: AttendanceUser[]}>((resolve, reject) => {
    User.find((err, users) => {
      if (err) return reject(err);

      const output: Record<string, AttendanceUser[]> = {};
      const usersArr: AttendanceUser[] = [];

      for (const user of users) {
        usersArr.push({text: user.username + " (" + user.email + ")", id: user.id});

        const attendance = getAttendanceRecords(user);
        if(!attendance) continue;

        for (const attendanceDate of attendance) {
          if(!output.hasOwnProperty(attendanceDate)) output[attendanceDate] = [];
          output[attendanceDate].push({text: user.username + " (" + user.email + ")", id: user.id});
        }
      }

      resolve({
        attendance: output,
        users: usersArr
      });
    });
  });
};