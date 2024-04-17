import { TakenLectures } from '../business/lecture/taken-lecture.query';
import { ResultCategoryDetailInfo } from '../business/result/result.query';
import { SignUpRequestBody, SignInRequestBody, UserInfoResponse } from '../business/user/user.type';
import { takenLectures, resultCategoryDetailInfo } from './data.mock';

interface MockUser {
  authId: string;
  password: string;
  studentNumber: string;
  engLv: string;
  major: string;
  isSumbitted: boolean;
  name: string;
}

interface MockDatabaseState {
  takenLectures: TakenLectures;
  resultCategoryDetailInfo: ResultCategoryDetailInfo;
  users: MockUser[];
}

type MockDatabaseAction = {
  getTakenLectures: () => TakenLectures;
  getResultCategoryDetailInfo: () => ResultCategoryDetailInfo;
  deleteTakenLecture: (lectureId: number) => boolean;
  getUser: (authId: string) => MockUser | undefined;
  createUser: (user: SignUpRequestBody) => boolean;
  signIn: (userData: SignInRequestBody) => boolean;
  getUserInfo: (authId: string) => UserInfoResponse;
};

export const mockDatabase: MockDatabaseAction = {
  getTakenLectures: () => mockDatabaseStore.takenLectures,
  deleteTakenLecture: (lectureId: number) => {
    if (mockDatabaseStore.takenLectures.takenLectures.find((lecture) => lecture.id === lectureId)) {
      mockDatabaseStore.takenLectures.takenLectures = mockDatabaseStore.takenLectures.takenLectures.filter(
        (lecture) => lecture.id !== lectureId,
      );
      return true;
    }
    return false;
  },
  getResultCategoryDetailInfo: () => mockDatabaseStore.resultCategoryDetailInfo,
  getUser: (authId: string) => mockDatabaseStore.users.find((user) => user.authId === authId),
  createUser: (user: SignUpRequestBody) => {
    if (mockDatabaseStore.users.find((u) => u.authId === user.authId || u.studentNumber === user.studentNumber)) {
      return false;
    }
    mockDatabaseStore.users = [
      ...mockDatabaseStore.users,
      {
        ...user,
        isSumbitted: false,
        major: '융소입니다',
        name: '모킹이2',
      },
    ];
    return true;
  },
  signIn: (userData: SignInRequestBody) => {
    const user = mockDatabaseStore.users.find((u) => u.authId === userData.authId && u.password === userData.password);
    return !!user;
  },
  getUserInfo: (authId: string) => {
    const user = mockDatabaseStore.users.find((u) => u.authId === authId);
    if (!user) {
      return {
        studentNumber: '',
        studentName: '',
        major: '',
        isSumbitted: false,
      };
    }
    return {
      studentNumber: user.studentNumber,
      studentName: user.name,
      major: user.major,
      isSumbitted: user.isSumbitted,
    };
  },
};

const initialState: MockDatabaseState = {
  takenLectures: takenLectures,
  resultCategoryDetailInfo: resultCategoryDetailInfo,
  users: [
    {
      authId: 'admin',
      password: 'admin',
      studentNumber: '60000000',
      engLv: 'ENG12',
      isSumbitted: false,
      major: '융소입니다',
      name: '모킹이',
    },
  ],
};

function initStore(): MockDatabaseState {
  return JSON.parse(JSON.stringify(initialState));
}

export let mockDatabaseStore = initStore();

export const resetMockDB = () => {
  mockDatabaseStore = initStore();
};
