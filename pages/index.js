import { useState } from "react"

export default function Home() {
  return (
    <>
      <Header />
      <Banner />
      <App />
    </>
  )
}


function Header() {
  return (
    <div>
      <div className="flex p-5 justify-center font-serif text-2xl text-blue-500">
        Who is hiring?
      </div>
    </div>
  )
}

function Banner() {
  return (
    <div className="text-white bg-blue-500 font-serif p-10  grid ">
      <div className="flex justify-center text-xl">
        Seek out hiring managers and recruiters
      </div>
      <div className="text-sm justify-center flex">**Current feature only supports the roles within India**</div>
    </div>
  )
}


function App() {
  const [companies, setCompanies] = useState([]);
  const [skills, setSkills] = useState([]);
  const [roles, setRoles] = useState([]);
  const [advancedSearch, setAdvancedSearch] = useState(false);

  
  const style = {
    list: "pt-1 ml-1",
    input: "border ml-4",
    button: "p-1",
    container: "container m-4 p-2"
  }


  const handleSubmit = (event) => {
    event.preventDefault();
    let query = companies.join(' OR ');
    if (advancedSearch) {
      query = `${query} (${roles.join(' OR ')})`;
    }
    const searchUrl = `https://www.google.com/search?q=intile:${encodeURIComponent(query)}"hiring" site:in.linkedin.com `;
    window.location.href = searchUrl;
  };

  const handleSubmitRole = (event) => {
    event.preventDefault();
    const rolesInput = event.target.elements.role;
    const role = rolesInput.value.trim();
    if (role.length > 0 && !roles.includes(role)) {
      setRoles([...roles, role]);
      rolesInput.value = '';
    }
 
  };
  const handleDeleteRole = (role) => {
    setCompanies(roles.filter((c) => c !== role));
  };

  const handleAddCompany = (event) => {
    event.preventDefault();
    const companyInput = event.target.elements.company;
    const company = companyInput.value.trim();
    if (company.length > 0 && !companies.includes(company)) {
      setCompanies([...companies, company]);
      companyInput.value = '';
    }
  };

  const handleAddSkills = (event) => {

    event.preventDefault();
    const skillInput = event.target.elements.skill;
    const skill = skillInput.value.trim();
    if (skill.length > 0 && !skills.includes(skill)) {
      setSkills([...skills, skill]);
      skillInput.value = '';
    }
  };

  const handleDeleteCompany = (company) => {
    setCompanies(companies.filter((c) => c !== company));
  };

  return (
    <div className="font-serif p-2 m-2">

      <div className={style.container}>
        <form onSubmit={handleAddCompany}>
          <label>
            Add a company:
            <input type="text" name="company" className={style.input}/>
          </label>
        </form>
        {companies.length > 0 && (
          <ul>
            {companies.map((company,val) => (
              <li key={company} className={style.list}>
                {val+1} {company}
                <button className = {style.button}type="button" onClick={() => handleDeleteCompany(company)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      
      <div className={style.container}>
        <form onSubmit={handleAddSkills}>
          <label>
            Add skills (Enter to add the role):
            <input type="text" name="skill" className={style.input}/>
          </label>
        </form>
        {skills.length > 0 && (
          <ul>
            {skills.map((skill,val) => (
              <li key={skill} className={style.list}>
                {val+1} {skill}
                <button className={style.button} type="button" onClick={() => handleDeleteCompany(skill)}>Delete</button>
              </li>
            ))}
          </ul>
        )}
      </div>
      
      <div className={style.container}>
        <form onSubmit={handleSubmitRole}>
          <label>
            Add Roles (Enter to add the role):
            <input type="text" name="role" className={style.input}/>
          </label>
        </form>
        {roles.length > 0 && (
          <ul>
            {roles.map((role,val) => (
              <li key={role} className={style.list}>
                <div>
                  {val+1} {role} 
                  <button className={style.button}type="button" onClick={() => handleDeleteRole(role)}>
                  Delete
                </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      
      <div className={style.container}>
        <form onSubmit={handleSubmit}>
          <label>
            <input type="checkbox" checked={advancedSearch} onChange={(event) => setAdvancedSearch(event.target.checked)} />
            Use advanced search
          </label>
          <button className={style.button} type="submit">Search</button>
        </form>
      </div>
    </div>
      
  );
}
