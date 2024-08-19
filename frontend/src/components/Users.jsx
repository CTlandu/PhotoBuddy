import { useState, useEffect } from "react";
import axios from "../api/axios";
import React from "react";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // 查看组件（UseEffect）是否挂载。这在异步操作中很常见，确保当异步操作完成时，组件没有被卸载，从而避免内存泄漏和潜在的错误。
    let isMounted = true;
    // 创建一个AbortController对象，用于控制和取消异步请求
    const controller = new AbortController();

    const getUser = async () => {
      try{
        // signal 是 AbortController 实例上的一个属性，它被传递给 axios 请求，用于控制这个请求的取消。
        // 通过将 signal 传递给请求，我们可以在需要时使用 controller.abort() 来取消这个请求。
        const response = await axios.get("/users", {
          signal: controller.signal,
        });
        console.log(response.data);
        // 在异步操作完成后，只有在组件仍然挂载的情况下，才会调用 setUsers 方法更新状态。如果组件已经卸载，isMounted 会变为 false，从而避免执行 setUsers。
        isMounted && setUsers(response.data);
      }catch (err){
        console.error(err);
        console.log("有错误");
      }
    }
    getUser();
    // 清理组件，卸载组件时调用。比如网页关闭的时候？
    return () => {
      isMounted = false;
      controller.abort();
    }

  }, []);

  return(
    <article>
      <h2>User List</h2>
      {users?.length ? (
        <ul>
          {users.map((user, index) => {
            return <li key={index}>{user?.name}</li>
          })}
        </ul>
      ): <p>No users to display</p>}
    </article>
  )
};

export default Users;