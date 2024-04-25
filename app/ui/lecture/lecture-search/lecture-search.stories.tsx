import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent } from '@storybook/test';
import { mockDatabase, resetMockDB } from '@/app/mocks/db.mock';
import TakenLectureAtomHydrator from '@/app/store/taken-lecture-atom-hydrator';
import { screen } from '@storybook/testing-library';
import TakenLectureLabel from '../taken-lecture/taken-lecture-label';
import TakenLectureList from '../taken-lecture/taken-lecture-list';
import LectureSearch from '.';
import { DIALOG_KEY } from '@/app/utils/key/dialog-key.util';
import Drawer from '../../view/molecule/drawer/drawer';
import { delay } from 'msw';

const meta = {
  title: 'ui/lecture/lecture-search',
  component: LectureSearch,
  decorators: [
    (Story) => {
      resetMockDB();
      const data = mockDatabase.getTakenLectures();
      return (
        <>
          <TakenLectureAtomHydrator initialValue={data.takenLectures}>
            <TakenLectureLabel />
            <TakenLectureList />
          </TakenLectureAtomHydrator>
          <Drawer drawerKey={DIALOG_KEY.LECTURE_SEARCH}>
            <Story />
          </Drawer>
        </>
      );
    },
  ],
} as Meta<typeof TakenLectureList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AddSenario: Story = {
  play: async ({ step }) => {
    await step('사용자가 추가를 클릭하면 lecture search drawer 창이 띄워진다', async () => {
      const toggleLectureSearch = await screen.findByTestId('toggle-lecture-search');
      await userEvent.click(toggleLectureSearch);

      const lectureSearch = await screen.findByTestId('lecture-search');
      expect(lectureSearch).toBeInTheDocument();
    });
    await step('추가 버튼을 클릭하면 추가 버튼이 disabled 된다', async () => {
      const addButton = await screen.findAllByTestId('add-taken-lecture-button');
      await userEvent.click(addButton[0]);

      await delay(3000);
      expect(addButton[0]).toBeDisabled();
    });
  },
};
