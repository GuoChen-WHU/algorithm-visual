export const addNum = (num) => ({
  type: 'ADD_NUM',
  num
});

export const changeNums = (nums) => ({
  type: 'CHANGE_NUMS',
  nums
});

export const changeCurrent = (index) => ({
  type: 'CHANGE_CURRENT',
  index
});

export const changeTarget = (index) => ({
  type: 'CHANGE_TARGET',
  index
});

export const addMessage = (message) => ({
  type: 'ADD_MESSAGE',
  message
});

export const clearMessages = () => ({
  type: 'CLEAR_MESSAGES'
});
