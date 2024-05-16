import { SearchLectures } from '../business/lecture/search-lecture.query';
import { TakenLectures } from '../business/lecture/taken-lecture.query';
import { CreditResponse, ResultCategoryDetailResponse } from '../business/result/result.type';
import {
  SignUpRequestBody,
  SignInRequestBody,
  UserInfoResponse,
  InitUserInfoResponse,
} from '../business/user/user.type';
import { takenLectures, credits, searchLectures, userInfo, users, resultCategoryDetailInfo } from './data.mock';

interface MockDatabaseState {
  takenLectures: TakenLectures;
  resultCategoryDetailInfo: ResultCategoryDetailResponse;
  credits: CreditResponse[];
  users: SignUpRequestBody[];
  searchLectures: SearchLectures;
  userInfo: UserInfoResponse;
}

type MockDatabaseAction = {
  getTakenLectures: () => TakenLectures;
  getSearchLectures: () => SearchLectures;
  addTakenLecture: (lectureId: number) => boolean;
  deleteTakenLecture: (lectureId: number) => boolean;
  createUser: (user: SignUpRequestBody) => boolean;
  signIn: (userData: SignInRequestBody) => boolean;
  deleteUser: (authId: string, password: string) => boolean;
  getCredits: () => CreditResponse[];
  getUserInfo: (authId: string) => UserInfoResponse | InitUserInfoResponse;
  getResultCategoryDetailInfo: () => ResultCategoryDetailResponse;
};

export const mockDatabase: MockDatabaseAction = {
  getTakenLectures: () => mockDatabaseStore.takenLectures,
  getSearchLectures: () => mockDatabaseStore.searchLectures,
  getResultCategoryDetailInfo: () => mockDatabaseStore.resultCategoryDetailInfo,
  deleteTakenLecture: (lectureId) => {
    if (mockDatabaseStore.takenLectures.takenLectures.find((lecture) => lecture.id === lectureId)) {
      mockDatabaseStore.takenLectures.takenLectures = mockDatabaseStore.takenLectures.takenLectures.filter(
        (lecture) => lecture.id !== lectureId,
      );
      return true;
    }
    return false;
  },
  addTakenLecture: (lectureId) => {
    mockDatabaseStore.takenLectures.takenLectures = [
      ...mockDatabaseStore.takenLectures.takenLectures,
      {
        id: lectureId,
        year: '2023',
        semester: '2학기',
        lectureCode: 'HECD140',
        lectureName: '추가한과목',
        credit: 3,
      },
    ];
    return true;
  },

  getCredits: () => mockDatabaseStore.credits,
  createUser: (user: SignUpRequestBody) => {
    if (mockDatabaseStore.users.find((u) => u.authId === user.authId || u.studentNumber === user.studentNumber)) {
      return false;
    }
    mockDatabaseStore.users = [...mockDatabaseStore.users, user];
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
        studentName: null,
        completionDivision: null,
        totalCredit: null,
        takenCredit: null,
        graduated: null,
      };
    }
    return mockDatabaseStore.userInfo;
  },
  deleteUser: (authId: string, password: string) => {
    const user = mockDatabaseStore.users.find((u) => u.authId === authId && u.password === password);
    if (user) {
      mockDatabaseStore.users = mockDatabaseStore.users.filter((u) => u.authId !== authId);
      return true;
    }
    return false;
  },
};

const initialState: MockDatabaseState = {
  takenLectures: takenLectures,
  resultCategoryDetailInfo: resultCategoryDetailInfo,
  credits: credits,
  users: users,
  searchLectures: searchLectures,
  userInfo: userInfo,
};

function initStore(): MockDatabaseState {
  return JSON.parse(JSON.stringify(initialState));
}

export let mockDatabaseStore = initStore();

export const resetMockDB = () => {
  mockDatabaseStore = initStore();
};
