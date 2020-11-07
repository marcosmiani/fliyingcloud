import React from 'react'
import { Select, Spin } from 'antd'
import { CompassOutlined } from '@ant-design/icons'
import debounce from 'lodash/debounce'
import { useDispatch, useSelector } from 'react-redux'
import { searchLocation } from './state'
const { Option } = Select

function NotFound () {
  return (
    <div style={{ textAlign: 'center' }}>
      <CompassOutlined style={{ fontSize: 20 }} />
      <p>Destination Not Found</p>
    </div>
  )
}

function RemoteSelect (props) {
  const { searchType = 'origins', searchMode, ...restProps } = props

  const dispatch = useDispatch()
  const searchLoading = useSelector(state => state.search.locations[searchType].loading)
  const searchError = useSelector(state => state.search.locations[searchType].error)
  const searchResults = useSelector(state => state.search.locations[searchType].items)

  const fetchUser = debounce(value => {
    dispatch(searchLocation[searchType]({ term: value }))
  }, 500)

  return (
    <Select
      mode={searchMode}
      labelInValue
      showSearch
      loading={searchLoading}
      notFoundContent={
        searchLoading // if Loading
          ? <Spin size='small' />
          : searchError // if error
            ? <NotFound />
            : null
      }
      filterOption={false}
      onSearch={fetchUser}
      {...restProps}
    >
      {searchResults.map(d => (
        <Option key={d.code} value={d.code}>{d.name}</Option>
      ))}
    </Select>
  )
}

export default RemoteSelect
