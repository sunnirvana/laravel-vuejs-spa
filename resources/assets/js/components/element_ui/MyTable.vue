<template>
    <div class="container">
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column prop="date" label="Date" sortable width="180"> </el-table-column>
                    <el-table-column prop="name" label="Name" width="180"> </el-table-column>
                    <el-table-column prop="address" label="Address" :formatter="formatter"> </el-table-column>
                    <el-table-column prop="tag" label="Tag" width="100" :filters="[{ text: 'Home', value: 'Home' }, { text: 'Office', value: 'Office' }]"
                                     :filter-method="filterTag" filter-placement="bottom-end">
                        <template slot-scope="scope">
                            <el-tag :type="scope.row.tag === 'Home' ? 'primary' : 'success'" close-transition>{{scope.row.tag}} </el-tag>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "my-table",
        data() {
            return {
                tableData: [
                    {
                        date: '2016-05-03',
                        name: 'Tom',
                        address: 'No. 189, Grove St, Los Angeles',
                        tag: 'Home'
                    }, {
                        date: '2016-05-02',
                        name: 'Tom',
                        address: 'No. 189, Grove St, Los Angeles',
                        tag: 'Office'
                    }, {
                        date: '2016-05-04',
                        name: 'Tom',
                        address: 'No. 189, Grove St, Los Angeles',
                        tag: 'Home'
                    }, {
                        date: '2016-05-01',
                        name: 'Tom',
                        address: 'No. 189, Grove St, Los Angeles',
                        tag: 'Office'
                    }
                ]
            }
        },
        methods: {
            formatter(row, column) {
                return row.address;
            },
            filterTag(value, row) {
                return row.tag === value;
            }
        }
    }
</script>

<style scoped>

</style>