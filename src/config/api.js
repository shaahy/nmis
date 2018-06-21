const API_ROOT = process.env.API_ROOT
export default {
    api:{
        //登陆接口
        login:`${API_ROOT}/users/login`,
        //获取部门列表
        get_department_list: hid => `${API_ROOT}/hospitals/${hid}/departments`,
        //删除部门
        delete_department: (hid, dept_id) => `${API_ROOT}/hospitals/${hid}/departments/${dept_id}`,
        //添加部门
        create_department: hid => `${API_ROOT}/hospitals/${hid}/departments/create`,
        //编辑部门
        update_department: (hid, dept_id) => `${API_ROOT}/hospitals/${hid}/departments/${dept_id}`,
        //获取所有员工
        get_staff_list: hid => `${API_ROOT}/hospitals/${hid}/staffs`,
        //分配权限
        change_staffs_permission: hid => `${API_ROOT}/hospitals/${hid}/staffs/change-permission`,
        //删除员工
        delete_staff: (hid, staff_id) => `${API_ROOT}/hospitals/${hid}/staffs/${staff_id}`,
        //修改员工信息
        update_staff: (hid, staff_id) => `${API_ROOT}/hospitals/${hid}/staffs/${staff_id}`,
        //添加员工
        create_staff: hid => `${API_ROOT}/hospitals/${hid}/staffs/create`
    }
}