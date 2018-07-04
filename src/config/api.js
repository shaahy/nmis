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
        //获取某机构下所有员工
        get_staff_list: hid => `${API_ROOT}/hospitals/${hid}/staffs`,
        //删除员工
        delete_staff: (hid, staff_id) => `${API_ROOT}/hospitals/${hid}/staffs/${staff_id}`,
        //修改员工信息
        update_staff: (hid, staff_id) => `${API_ROOT}/hospitals/${hid}/staffs/${staff_id}`,
        //添加员工
        create_staff: hid => `${API_ROOT}/hospitals/${hid}/staffs/create`,
        //获取权限组列表
        get_group_list: hid => `${API_ROOT}/hospitals/${hid}/groups`,
        //分配权限
        change_staffs_permission: hid => `${API_ROOT}/hospitals/${hid}/staffs/change-permission`, 
        //创建项目申请    
        create_project_plan: `${API_ROOT}/projects/create`, 
        //获取我的项目中项目列表，带筛选条件
        get_projet_list:`${API_ROOT}/projects/`,
        //返回医院全局数据
        hospital_global_data: hid => `${API_ROOT}/hospitals/${hid}/global-data`,
        //分配项目
        dispatch_project_plan: project_id => `${API_ROOT}/projects/${project_id}/dispatch`,
        //创建项目流程
        create_project_flow: `${API_ROOT}/projects/flows/create`,
        //更改项目里程碑状态
        change_project_milestone: project_id => `${API_ROOT}/projects/${project_id}/change-milestone`,
        //获取指定项目详情
        get_project_detail: project_id => `${API_ROOT}/projects/${project_id}`,
        //批量导入员工
        batch_upload_staffs: hid => `${API_ROOT}/hospitals/${hid}/staffs/batch-upload`,
        //为项目删除单个设备
        delete_device_for_project: (project_id, device_id) => `${API_ROOT}/projects/${project_id}/devices/${device_id}`

          
    }
}