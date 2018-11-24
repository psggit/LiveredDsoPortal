import React from 'react'
import { Table } from '@auth0/cosmos'
import { Button } from '@auth0/cosmos'
import Layout from './layout'

class Account extends React.Component {
  render() {
    return (
      <Layout title="Account">
        <div
          style={{
            marginTop: '40px',
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <p><span style={{ fontWeight: '600', color: '#4a4a4a' }}>Total Credits:</span> $170.00</p>
            <p style={{ margin: '20px 0' }}><span style={{ fontWeight: '600', color: '#4a4a4a' }}>Fee/OTTP:</span> $0.25</p>
            <p><span style={{ fontWeight: '600', color: '#4a4a4a' }}>OTTP limit/month:</span> 1220</p>
          </div>
          {/* <div>
            <Button appearance="default" icon="plus">Add credits</Button>
          </div> */}
        </div>

        <p
          style={{
            marginTop: '40px',
            fontSize: '18px',
            fontWeight: '600',
            color: '#4a4a4a'
          }}
        >
          Payment History
        </p>

        <div style={{ margin: '15px 0 0 0' }}>
          <Table
            items={[
              {
                id: '56723232',
                amount: '$191',
                transaction_time: '09/08/2018 14:20 PM',
                type: 'xyz',
              },
              {
                id: '87687879',
                amount: '$191',
                transaction_time: '09/08/2018 14:20 PM',
                type: 'xyz',
              },
              {
                id: '09876573',
                amount: '$191',
                transaction_time: '09/08/2018 14:20 PM',
                type: 'xyz',
              },
              {
                id: '43212344',
                amount: '$191',
                transaction_time: '09/08/2018 14:20 PM',
                type: 'xyz',
              },
              {
                id: '72937464',
                amount: '$191',
                transaction_time: '09/08/2018 14:20 PM',
                type: 'xyz',
              },
              {
                id: '94465338',
                amount: '$191',
                transaction_time: '09/08/2018 14:20 PM',
                type: 'xyz',
              }
            ]}
            onRowClick={(evt, item) => alert(`${item.id} was clicked!`)}
          >
            <Table.Column field="id" title="Transaction ID" width="30%" />
            <Table.Column field="amount" title="Transaction amount" />
            <Table.Column field="transaction_time" title="Transaction time" />
            <Table.Column field="type" title="Transaction type" />
          </Table>
        </div>
      </Layout>
    )
  }
}

export default Account
