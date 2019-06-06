
{
  //タスクの通し番号を定義
  let taskId = 0;
  //リストの表示を変える関数
  const changeList = status => {
    const trAll = document.querySelectorAll('tr');
    Array.from(trAll, tr => {
      tr.classList.remove('hide');
    });
    if (status === 'working'){
      const trComplete = document.querySelectorAll('tr.complete');
      Array.from(trComplete, tr => {
        tr.classList.add('hide');
      });
    }else if (status === 'complete'){
      const trWorking = document.querySelectorAll('tr.working');
      Array.from(trWorking, tr => {
        tr.classList.add('hide');
      });
    }
  }

  //ラジオボタンをクリックした場合にstatusの中身を取得してリスト表示を変える関数を実行
  const statusRadioButtons  = document.querySelectorAll('input[name="status"]');
  Array.from(statusRadioButtons, statusRadioButton => {
    statusRadioButton.addEventListener('click', e => {
      const status = e.target.value;
      changeList(status);
    });
  });

  //削除ボタン作成
  const createDeleteButton = task => {
    const deleteButton = document.createElement('button');
    deleteButton.textContent ='削除';
    deleteButton.addEventListener('click', () => {
      task.remove();
    });
    return deleteButton;
  }

  //状態ボタン作成
  const createStatusButton = task => {
    const statusButton = document.createElement('button');
    statusButton.textContent = '作業中';
    task.classList.add("working");
    //ボタンを押した際にタスクの状態を入れ替える
    statusButton.addEventListener('click', () => {
      task.classList.toggle('working');
      task.classList.toggle('complete');
      if (statusButton.textContent === '作業中'){
        statusButton.textContent = '完了';
      }else{
        statusButton.textContent = '作業中';
      }
    });
    return statusButton;
  }

  //タスクを追加する機能
  document.getElementById('submit').addEventListener('click',() => {
    //フォームからタスクの中身を含む要素を取得
    const taskForm = document.getElementById('task');
    //フォームの中身チェック
    if (taskForm.value !== ''){
      taskStr = taskForm.value
      taskForm.value = '';
      taskId += 1;
      //タスク部分のDOM作成
      const task = document.createElement('tr');
      const taskIdArea = document.createElement('td');
      const taskTextArea = document.createElement('td');
      const buttonArea = document.createElement('td');
      const deleteButton = createDeleteButton(task);
      const statusButton = createStatusButton(task);
      taskIdArea.textContent = taskId;
      taskTextArea.textContent = taskStr;
      buttonArea.appendChild(statusButton);
      buttonArea.appendChild(deleteButton);
      task.appendChild(taskIdArea);
      task.appendChild(taskTextArea);
      task.appendChild(buttonArea);
      document.querySelector('table').appendChild(task);
    }
  });
}
