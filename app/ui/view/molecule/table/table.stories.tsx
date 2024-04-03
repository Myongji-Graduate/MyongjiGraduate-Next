import type { Meta, StoryObj } from '@storybook/react';
import Button from '../../atom/button/button';
import { Table } from '.';
import { SwipeAction, TrailingActions } from 'react-swipeable-list';

const meta = {
  title: 'ui/view/molecule/Table',
  component: Table,
} satisfies Meta<typeof Table>;

export default meta;

export const TakenLectureTable: StoryObj = {
  render: () => {
    const headerInfo = ['과목코드', '과목명', '학점'];
    const lectures = [
      {
        id: 140,
        lectureCode: 'HED01407',
        lectureName: '딥러닝',
        credit: 3,
      },
      {
        id: 143,
        lectureCode: 'HED01407',
        lectureName: '인공지능',
        credit: 3,
      },
    ];

    return (
      <main>
        <Table data={lectures} headerInfo={headerInfo} />
      </main>
    );
  },
};

export const ButtonLectureTable: StoryObj = {
  render: () => {
    const headerInfo = ['수강년도', '수강학기', '과목코드', '과목명', '학점'];
    const lectures = [
      {
        id: 140,
        year: '2024',
        semester: '1학기',
        lectureCode: 'HED01407',
        lectureName: '딥러닝',
        credit: 3,
      },
      {
        id: 143,
        year: '2024',
        semester: '1학기',
        lectureCode: 'HED01407',
        lectureName: '인공지능',
        credit: 3,
      },
    ];
    const actionButton = () => <Button variant="text" label="삭제" />;
    return (
      <main className="w-[600px]">
        <Table headerInfo={headerInfo} data={lectures} renderActionButton={actionButton} />
      </main>
    );
  },
};

export const SwipeableLectureTable: StoryObj = {
  render: () => {
    const headerInfo = ['수강년도', '수강학기', '과목코드', '과목명', '학점'];
    const lectures = [
      {
        id: 140,
        year: '2024',
        semester: '1학기',
        lectureCode: 'HED01407',
        lectureName: '딥러닝',
        credit: 3,
      },
      {
        id: 143,
        year: '2024',
        semester: '1학기',
        lectureCode: 'HED01407',
        lectureName: '인공지능',
        credit: 3,
      },
    ];
    const actionButton = () => (
      <TrailingActions>
        <SwipeAction data-testid="swipe-taken-lecture-delete-button" destructive={true} onClick={() => {}}>
          <div className="bg-gray-400 text-white flex justify-center items-center w-14">삭제</div>
        </SwipeAction>
      </TrailingActions>
    );
    return (
      <main>
        <Table headerInfo={headerInfo} data={lectures} renderActionButton={actionButton} swipeable={true} />
      </main>
    );
  },
};
