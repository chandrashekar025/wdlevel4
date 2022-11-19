/* eslint-disable no-undef */
const todoList = require("../todo");
const { all, markAsComplete, add, overdue, dueLater, dueToday } = todoList();
const formattedDate = (d) => {
  return d.toISOString().split("T")[0];
};
let dateToday = new Date();
const tod = formattedDate(dateToday);
const y = formattedDate(new Date(new Date().setDate(dateToday.getDate() - 1)));
const tomorrow = formattedDate(
  new Date(new Date().setDate(dateToday.getDate() + 1))
);
describe("TodoList Testing", () => {
  beforeAll(() => {
    add({
      title: "go to buy goods ",
      completed: false,
      dueDate: tod,
    });
  });
  test("Should add new todo", () => {
    add(
      {
        title: "wash shoes",
        completed: false,
        dueDate: tomorrow,
        //console.log(dueDate),
      },
      {
        title: "watch jana gana mana movie",
        completed: false,
        dueDate: y,
      }
    );
    const t_count = all.length;
    add({
      title: "eat dilkush",
      completed: false,
      dueDate: y,
    });

    expect(all.length).toBe(t_count + 1);
  });
  test("Should mark a todo as complete", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });
  test("Should check overdue items", () => {
    a = overdue();
    expect(all[2].dueDate).toBe(a[0]["dueDate"]);
  });
  test("Should check retrieval of duetoday items", () => {
    a = dueToday();
    expect(all[0].dueDate).toBe(a[0]["dueDate"]);
  });
  test("Should check retrieval of due later items", () => {
    a = dueLater();
    expect(all[1].dueDate).toBe(a[0]["dueDate"]);
  });
});
