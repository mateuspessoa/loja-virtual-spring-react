package com.dev.backend.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dev.backend.entity.Marca;
import com.dev.backend.repository.MarcaRepository;

@Service
public class MarcaService {
	
	@Autowired
	private MarcaRepository marcaRepository;
	
	public List<Marca> buscarTodos(){
		return marcaRepository.findAll();
	}
	
	public Marca inserir(Marca marca) {
		marca.setDataCriacao(new Date());
		Marca marcaNova = marcaRepository.saveAndFlush(marca);
		return marcaNova;
	}
	
	public Marca alterar(Marca marca) {
		marca.setDataAtualizacao(new Date());
		return marcaRepository.saveAndFlush(marca);
	}
	
	public void excluir(Long id) {
		try {
			Marca marca = marcaRepository.findById(id).get();
			marcaRepository.delete(marca);
		} catch (org.springframework.dao.DataIntegrityViolationException e) {
			throw new RuntimeException("Existem produtos cadastrados com essa marca");
		}
	}
}
