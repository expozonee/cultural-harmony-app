import { Github, Linkedin } from 'lucide-react';

function AboutUsPage() {
  const team = [
    {
      name: 'Israel Litvak',
      image:
        'https://res.cloudinary.com/dpixrsdwh/image/upload/v1715088963/israel_e8xrgk.jpg',
      linkedin: 'https://www.linkedin.com/in/israel-litvak/',
      github: 'https://github.com/lisrael1989',
    },
    {
      name: 'Ibrahem Haj Ali',
      image: '/api/placeholder/300/300',
      linkedin: 'https://linkedin.com/in/ibrahem-haj-ali-3057a5250',
      github: 'https://github.com/expozonee',
    },
    {
      name: 'Layan Haddad',
      image:
        'https://res.cloudinary.com/dpixrsdwh/image/upload/v1735224939/kt45756hmhhbj9zaiek0.jpg',
      linkedin:
        'https://www.linkedin.com/in/layan-haddad?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app',
      github: 'https://github.com/layan10',
    },
    {
      name: 'ward keadan',
      image:
        'https://res.cloudinary.com/dpixrsdwh/image/upload/v1735225400/449829830_1514531442467714_9154704187662661133_n_dj6e2e.jpg',
      linkedin: 'https://www.linkedin.com/in/ward-keadan-0b633b1b0/',
      github: 'https://github.com/wardkadan1',
    },
    {
      name: 'Nana',
      image:
        'https://res.cloudinary.com/dpixrsdwh/image/upload/v1735224939/kt45756hmhhbj9zaiek0.jpg',
      linkedin: 'https://www.linkedin.com/in/ward-keadan-0b633b1b0/',
      github: 'https://github.com/nana232002',
    },
    {
      name: 'Jarden Aaltonen',
      image:
        'https://res.cloudinary.com/dpixrsdwh/image/upload/v1735224939/kt45756hmhhbj9zaiek0.jpg',
      linkedin: 'https://www.linkedin.com/in/jarden-aaltonen/',
      github: 'https://github.com/jvseds',
    },
  ];

  return (
    <div className="about-container">
      <div className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Bringing Communities Together</h1>
          <p className="hero-description">
            Creating harmony through shared meals and cultural exchange between
            Jewish, Arab, and Christian communities.
          </p>
        </div>
      </div>

      <div className="mission">
        <h2 className="mission-title">Our Mission</h2>
        <p className="mission-text">
          We believe that sharing food is the universal language of friendship.
          Our platform connects people from different cultural backgrounds,
          creating meaningful relationships through cooking and dining together.
        </p>
      </div>

      <div className="team">
        <div className="team-container">
          <h2 className="team-title">Meet Our Team</h2>
          <div className="team-grid">
            {team.map((member) => (
              <div key={member.name} className="team-card">
                <img
                  src={member.image}
                  alt={member.name}
                  className="member-image"
                />
                <h3 className="member-name">{member.name}</h3>
                <p className="member-role">{member.role}</p>
                <div className="social-links">
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                  >
                    <Linkedin size={24} />
                  </a>
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                  >
                    <Github size={24} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUsPage;
