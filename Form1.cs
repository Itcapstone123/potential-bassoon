using MySql.Data.MySqlClient;
using System.Data;

namespace QueryApp3
{
    public partial class Form1 : Form
    {
        string connectionstring = "Datasource=156.67.74.151;Database=u822925530_Itcapstone;Uid=u822925530_Itcapstone;Pwd=@Itcapstone123;Convert Zero Datetime=True";
        public Form1()
        {
            InitializeComponent();
        }

        private void Form1_Load(object sender, EventArgs e)
        {


        }


        private void button1_Click(object sender, EventArgs e)
        {
            // 1) Print all the customers and their login information,
            // 2) Order history for each user (personalized by each user.
            // Do not print all users and order history at once).
            try
            {
                //string connectionstring = "Datasource=156.67.74.151;Port=3306;Username=u822925530_Itcapstone;Password=@Itcapstone123";
                //string connectionstring = "Datasource=156.67.74.151;Database=u822925530_Itcapstone;Uid=u822925530_Itcapstone;Pwd=@Itcapstone123";
                //"Server=127.0.0.1:3306;Uid=username;Pwd=password;Database=db;"



                string mysql = "SELECT * FROM u822925530_Itcapstone.users ";

                MySqlConnection conn = new MySqlConnection(connectionstring);
                MySqlCommand command = new MySqlCommand(mysql, conn);

                conn.Open();

                //meh
                MySqlDataAdapter dtb = new MySqlDataAdapter();
                dtb.SelectCommand = command;

                DataTable dtable = new DataTable();
                dtb.Fill(dtable);

                dataGridView1.DataSource = dtable;

            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }

        }

        private void label1_Click(object sender, EventArgs e)
        {
            //forget this
        }

        private void button2_Click(object sender, EventArgs e)
        {
            //search button for customer orders


            try
            {


                MySqlConnection conn = new MySqlConnection(connectionstring);
                conn.Open();

                MySqlDataAdapter adapter = new MySqlDataAdapter("SEARCH", conn);
                adapter.SelectCommand.CommandType = CommandType.StoredProcedure;
                adapter.SelectCommand.Parameters.AddWithValue("SEARCH", textBox1.Text);
                DataTable dtb = new DataTable();
                adapter.Fill(dtb);
                dataGridView1.DataSource = dtb;
                dataGridView1.Columns[0].Visible = false;

                //WHERE customer_id like('%', SEARCH, '%')


            }

            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
        }

        private void button3_Click(object sender, EventArgs e)
        {
            //exit button
            Application.Exit();
        }

        private void textBox1_TextChanged(object sender, EventArgs e)
        {

        }

        private void splitContainer1_Panel2_Paint(object sender, PaintEventArgs e)
        {

        }
    }
}